import React, { useState } from 'react';
import { MapPin, Navigation, Globe2, ExternalLink, Compass, Layers } from 'lucide-react';

export const LocationMap: React.FC = () => {
  const [mapMode, setMapMode] = useState<'earth' | 'roadmap'>('earth');

  // Coordinates for Gaindakot 4, Nepal
  const lat = 27.705;
  const lng = 84.409;

  // Google 3D Earth Satellite & Roadmap URLs
  const earth3dUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14130.93172084654!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994fb2193b2923f%3A0x4632837bc23f13a6!2sGaindakot%204%2C%20Gaindakot%2033700%2C%20Nepal!5e1!3m2!1sen!2snp!4v1710000000000!5m2!1sen!2snp`;
  const roadmapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14130.93172084654!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994fb2193b2923f%3A0x4632837bc23f13a6!2sGaindakot%204%2C%20Gaindakot%2033700%2C%20Nepal!5e0!3m2!1sen!2snp!4v1710000000000!5m2!1sen!2snp`;

  const googleEarthDirectUrl = `https://earth.google.com/web/search/Gaindakot+4,+Nepal/@${lat},${lng},200a,35y,0h,45t,0r`;
  const googleMapsSatelliteUrl = `https://www.google.com/maps/place/Gaindakot+4,+Gaindakot+33700,+Nepal/@${lat},${lng},15z/data=!3m1!1e3`;

  return (
    <section id="location" className="py-20 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Globe2 className="w-4 h-4" />
            <span>Real 3D Earth Location</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Based in Gaindakot-4, Nepal
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
            Operating from Gaindakot, Nawalpur, Gandaki Province, Nepal. Connected globally.
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 relative">
          
          {/* Top Info Bar & Interactive Mode Controls */}
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-3 flex-wrap pointer-events-none">
            
            {/* Location Tag */}
            <div className="pointer-events-auto bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/30">
                <Navigation className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  Gaindakot-4
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Gandaki Province, Nepal • 27.705° N, 84.409° E</p>
              </div>
            </div>

            {/* View Mode Switcher */}
            <div className="pointer-events-auto flex items-center gap-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setMapMode('earth')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  mapMode === 'earth'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span>3D Earth Satellite</span>
              </button>
              <button
                type="button"
                onClick={() => setMapMode('roadmap')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  mapMode === 'roadmap'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Standard Map</span>
              </button>
            </div>
          </div>

          {/* Google Maps Real 3D Earth Satellite / Roadmap View */}
          <div className="w-full h-[480px] sm:h-[520px] relative bg-zinc-950">
            <iframe
              key={mapMode}
              title="Gaindakot 4 Real Google 3D Earth Map"
              src={mapMode === 'earth' ? earth3dUrl : roadmapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>

          {/* Bottom Quick Launch Actions */}
          <div className="px-5 py-3.5 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4 flex-wrap text-xs">
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <Compass className="w-4 h-4 text-emerald-500 animate-spin" style={{ animationDuration: '10s' }} />
              <span>Real-time Photorealistic Google 3D Satellite Imagery</span>
            </div>
            
            <div className="flex items-center gap-3">
              <a
                href={googleEarthDirectUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 font-medium transition-colors"
              >
                <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Open in Google Earth 3D</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>

              <a
                href={googleMapsSatelliteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 text-indigo-200" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
