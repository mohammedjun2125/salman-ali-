import React, {useCallback, useEffect, useState} from 'react';
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  APILoadingStatus,
} from '@vis.gl/react-google-maps';
import {MapPin, ExternalLink, Navigation} from 'lucide-react';
import {weddingData, type WeddingEventVenue} from '../config/weddingData';

interface LatLngLiteral {
  lat: number;
  lng: number;
}

interface ResolvedVenuePlace {
  displayName?: string;
  formattedAddress?: string;
  location: LatLngLiteral;
  googleMapsURI?: string;
}

interface VenueMapCanvasProps {
  venue: WeddingEventVenue;
}

const VenueMapContent: React.FC<VenueMapCanvasProps> = ({venue}) => {
  const map = useMap();
  const placesLib = useMapsLibrary('places');
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [resolvedPlace, setResolvedPlace] = useState<ResolvedVenuePlace | null>(
    null
  );
  const [loadingPlace, setLoadingPlace] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [infoOpen, setInfoOpen] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (!placesLib) return;

    const resolveVenue = async () => {
      setLoadingPlace(true);
      setLookupError(null);
      try {
        const {places} = await placesLib.Place.searchByText({
          textQuery: venue.mapsQuery,
          fields: [
            'displayName',
            'formattedAddress',
            'location',
            'googleMapsURI',
          ],
          maxResultCount: 1,
        });

        if (cancelled) return;

        const match = places?.[0];
        if (match?.location) {
          const loc: LatLngLiteral = {
            lat: match.location.lat(),
            lng: match.location.lng(),
          };
          setResolvedPlace({
            displayName: match.displayName ?? venue.venueTitle,
            formattedAddress:
              match.formattedAddress ?? venue.addressLines.join(' '),
            location: loc,
            googleMapsURI: match.googleMapsURI ?? undefined,
          });
          setInfoOpen(true);
          if (map) {
            map.panTo(loc);
            map.setZoom(14);
          }
        } else {
          setLookupError('Showing regional venue area.');
        }
      } catch (err: unknown) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : String(err);
        if (
          message.includes('RESOURCE_EXHAUSTED') ||
          message.includes('OVER_QUERY_LIMIT') ||
          message.includes('Quota')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        setLookupError('Interactive pin fallback active for venue region.');
      } finally {
        if (!cancelled) {
          setLoadingPlace(false);
        }
      }
    };

    void resolveVenue();
    return () => {
      cancelled = true;
    };
  }, [placesLib, venue, map]);

  const handleCloseInfo = useCallback(() => setInfoOpen(false), []);

  if (!resolvedPlace) {
    return null;
  }

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={resolvedPlace.location}
        title={resolvedPlace.displayName ?? venue.venueTitle}
        onClick={() => setInfoOpen(true)}
      >
        <Pin
          background="#A88952"
          borderColor="#51402F"
          glyphColor="#FFFDF8"
          scale={1.25}
        />
      </AdvancedMarker>

      {infoOpen && marker && (
        <InfoWindow
          anchor={marker}
          maxWidth={270}
          onCloseClick={handleCloseInfo}
        >
          <div className="p-1 text-[#51402F] font-ui">
            <p className="font-royal text-xs tracking-wider text-[#A88952] font-semibold">
              {venue.title}
            </p>
            <p className="font-editorial text-sm font-semibold mt-0.5 text-[#51402F]">
              {resolvedPlace.displayName ?? venue.venueTitle}
            </p>
            <p className="text-xs text-[#555442] mt-1 leading-relaxed">
              {resolvedPlace.formattedAddress ?? venue.addressLines.join(' ')}
            </p>
            {loadingPlace && (
              <p className="text-[11px] text-[#92957B] mt-1">
                Locating venue...
              </p>
            )}
            {lookupError && !loadingPlace && (
              <p className="text-[11px] text-[#92957B] mt-1">{lookupError}</p>
            )}
          </div>
        </InfoWindow>
      )}
    </>
  );
};

interface VenueGoogleMapProps {
  selectedVenueId: 'nikah' | 'valima';
  onSelectVenue: (id: 'nikah' | 'valima') => void;
}

const MapStatusFallback: React.FC<{venue: WeddingEventVenue}> = ({venue}) => {
  const status = useApiLoadingStatus();
  const isError =
    status === APILoadingStatus.FAILED ||
    status === APILoadingStatus.AUTH_FAILURE;

  if (!isError) return null;

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#F3EADB]/95 p-6 text-center">
      <MapPin className="w-8 h-8 text-[#A88952] mb-2" />
      <p className="font-royal text-sm tracking-[0.14em] text-[#51402F]">
        {venue.venueTitle}
      </p>
      <p className="font-editorial text-sm text-[#555442] mt-1 max-w-sm">
        {venue.addressLines.join(' ')}
      </p>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          venue.mapsQuery
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="gold-shimmer-btn mt-4 inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] text-xs font-royal tracking-[0.14em] text-[#FFFDF8]"
      >
        <Navigation className="w-3.5 h-3.5" />
        OPEN IN GOOGLE MAPS
      </a>
    </div>
  );
};

export const VenueGoogleMap: React.FC<VenueGoogleMapProps> = ({
  selectedVenueId,
  onSelectVenue,
}) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const activeVenue =
    selectedVenueId === 'nikah'
      ? weddingData.events.nikah
      : weddingData.events.valima;

  const googleMapsSearchHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    activeVenue.mapsQuery
  )}`;

  return (
    <section
      id="venues"
      className="py-14 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto"
      aria-label="Interactive Wedding Venue Map"
    >
      <div className="text-center mb-8">
        <p className="font-royal text-xs tracking-[0.26em] text-[#A88952]">
          DIRECTIONS &amp; NAVIGATION
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#51402F] mt-2 text-balance">
          Royal Venue Guide
        </h2>
        <p className="font-editorial text-sm sm:text-base text-[#555442] mt-2 max-w-xl mx-auto">
          Select either celebration below to preview the venue location and launch turn-by-turn directions in Google Maps.
        </p>
      </div>

      {/* Venue Switcher Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-5">
        <button
          type="button"
          onClick={() => onSelectVenue('nikah')}
          className={`px-4 sm:px-6 py-2.5 min-h-[44px] text-xs font-royal tracking-[0.15em] border transition-colors whitespace-nowrap ${
            selectedVenueId === 'nikah'
              ? 'bg-[#51402F] text-[#FFFDF8] border-[#51402F]'
              : 'bg-[#FFFDF8] text-[#51402F] border-[#C5A46D]/60 hover:bg-[#F3EADB]'
          }`}
        >
          NIKAH · WARANGAL
        </button>
        <button
          type="button"
          onClick={() => onSelectVenue('valima')}
          className={`px-4 sm:px-6 py-2.5 min-h-[44px] text-xs font-royal tracking-[0.15em] border transition-colors whitespace-nowrap ${
            selectedVenueId === 'valima'
              ? 'bg-[#51402F] text-[#FFFDF8] border-[#51402F]'
              : 'bg-[#FFFDF8] text-[#51402F] border-[#C5A46D]/60 hover:bg-[#F3EADB]'
          }`}
        >
          VALIMA · GHATKESAR
        </button>
      </div>

      <div className="border border-[#C5A46D]/60 bg-[#FFFDF8] p-2 sm:p-3 shadow-[0_18px_48px_-24px_rgba(81,64,47,0.28)]">
        <div className="relative w-full h-[340px] sm:h-[420px] bg-[#F3EADB] overflow-hidden">
          {apiKey ? (
            <APIProvider
              apiKey={apiKey}
              language="en"
              region="IN"
              libraries={['places', 'marker']}
            >
              <GoogleMap
                mapId="DEMO_MAP_ID"
                defaultCenter={{lat: 17.65, lng: 79.05}}
                defaultZoom={8}
                gestureHandling="cooperative"
                disableDefaultUI={false}
                mapTypeControl={false}
                streetViewControl={false}
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                style={{width: '100%', height: '100%'}}
              >
                <VenueMapContent venue={activeVenue} />
              </GoogleMap>
              <MapStatusFallback venue={activeVenue} />
            </APIProvider>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F3EADB]">
              <MapPin className="w-9 h-9 text-[#A88952] mb-3" />
              <p className="font-royal text-sm tracking-[0.15em] text-[#51402F]">
                {activeVenue.venueTitle}
              </p>
              <p className="font-editorial text-sm text-[#555442] mt-1.5 max-w-md">
                {activeVenue.addressLines.join(' ')}
              </p>
              <a
                href={googleMapsSearchHref}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-shimmer-btn mt-5 inline-flex items-center gap-2 px-6 py-3 min-h-[44px] text-xs font-royal tracking-[0.16em] text-[#FFFDF8]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                OPEN IN GOOGLE MAPS
              </a>
            </div>
          )}
        </div>

        {/* Venue Footer Details Bar */}
        <div className="pt-3 pb-1 px-2 sm:px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="font-royal text-xs tracking-[0.16em] text-[#A88952]">
              {activeVenue.title} · {activeVenue.date}
            </p>
            <p className="font-editorial text-base font-semibold text-[#51402F] mt-0.5">
              {activeVenue.venueTitle}
            </p>
            <p className="font-ui text-xs text-[#555442]">
              {activeVenue.addressLines.join(' ')}
            </p>
          </div>

          <a
            href={googleMapsSearchHref}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-shimmer-btn inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] text-xs font-royal tracking-[0.16em] text-[#FFFDF8] shrink-0 whitespace-nowrap"
          >
            <Navigation className="w-3.5 h-3.5" />
            GET DIRECTIONS
          </a>
        </div>
      </div>
    </section>
  );
};
