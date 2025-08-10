import React, { useState } from "react";
import { Instagram, Banknote, Move, Trash2 } from "lucide-react";
import { mockPackages } from "../utils/mockData";
import { Package } from "../types";

export default function Pakete() {
  const [currentPackage, setCurrentPackage] = useState(1);
  const [packagePaymentStatus, setPackagePaymentStatus] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false
  });

  const currentPkg = mockPackages.find(pkg => pkg.id === currentPackage) || mockPackages[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Pakete</h1>
          <p className="muted">Instagram Content-Pakete verwalten</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Hauptpaket-Fenster */}
        <div className="xl:col-span-3 relative">
          <div className={`rounded-2xl p-6 shadow-xl border border-white/20 ${
            packagePaymentStatus[currentPackage] 
              ? 'bg-gradient-to-br from-green-50/80 to-emerald-100/60' 
              : 'bg-gradient-to-br from-amber-50/80 to-orange-100/60'
          }`}>
            <div className="flex items-center justify-between mb-6 relative">
              <div>
                <h2 className="text-2xl font-bold">{currentPkg.name}</h2>
                <p className="text-sm muted">
                  (erstellt am {new Date(currentPkg.createdDate).toLocaleDateString('de-DE')})
                </p>
              </div>
              
              {/* Payment Status Icon - mittig auf Höhe des PAKET Titels */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <button
                  onClick={() => setPackagePaymentStatus(prev => ({
                    ...prev,
                    [currentPackage]: !prev[currentPackage]
                  }))}
                  className="hover:scale-110 transition-all duration-200"
                >
                  <Banknote 
                    size={32} 
                    className={packagePaymentStatus[currentPackage] ? "text-green-600" : "text-amber-600"} 
                  />
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <Instagram size={20} className="text-pink-600" />
                <span className="text-sm font-medium">Instagram Reels</span>
              </div>
            </div>

            {/* Asset-Tabelle */}
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-0">
                <thead>
                  <tr className="border-b border-gray-300/25">
                    <th className="text-left py-3 px-4 font-semibold border-r border-gray-300/25">Asset Name</th>
                    <th className="text-center py-3 px-4 font-semibold border-r border-gray-300/25">Produziert</th>
                    <th className="text-center py-3 px-4 font-semibold">Geschnitten</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPkg.assets.map((asset, index) => (
                    <tr key={asset.id} className="border-b border-gray-300/25 hover:bg-white/20 transition-colors">
                      <td className="py-4 px-4 border-r border-gray-300/25">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white text-xs flex items-center justify-center font-semibold">
                            {index + 1}
                          </span>
                          {asset.name ? (
                            <span className="font-medium">{asset.name}</span>
                          ) : (
                            <span className="text-gray-400 italic">Noch nicht zugewiesen</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center border-r border-gray-300/25">
                        <input
                          type="checkbox"
                          checked={asset.produced}
                          onChange={(e) => {
                            // Produziert-Status ändern
                            console.log(`Asset ${asset.name} produziert: ${e.target.checked}`);
                          }}
                          className="w-5 h-5 rounded border-2 border-amber-500 text-amber-600 focus:ring-amber-500"
                        />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={asset.edited}
                          onChange={(e) => {
                            // Geschnitten-Status ändern
                            console.log(`Asset ${asset.name} geschnitten: ${e.target.checked}`);
                          }}
                          className="w-5 h-5 rounded border-2 border-amber-500 text-amber-600 focus:ring-amber-500"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paket-Aktionen */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-white/60 hover:bg-white/80 transition-colors">
                  <Move size={16} />
                </button>
                <button className="p-2 rounded-lg bg-white/60 hover:bg-white/80 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="text-sm muted">
                {currentPkg.assets.filter(a => a.name).length}/10 Assets zugewiesen
              </div>
            </div>
          </div>
        </div>

        {/* Vergangene Pakete Sidebar */}
        <div className="xl:col-span-1">
          <div className="card p-4">
            <h3 className="font-semibold mb-4">Vergangene Pakete</h3>
            <div className="space-y-3">
              {mockPackages.map((pkg: Package) => (
                <div
                  key={pkg.id}
                  onClick={() => setCurrentPackage(pkg.id)}
                  className={`p-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 ${
                    currentPackage === pkg.id
                      ? 'bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-amber-500/30'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Instagram size={14} className="text-pink-600" />
                    <span className="font-medium text-sm">{pkg.name}</span>
                  </div>
                  <p className="text-xs muted">
                    {new Date(pkg.createdDate).toLocaleDateString('de-DE')}
                  </p>
                  <div className="mt-2">
                    <div className="w-full bg-white/40 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-amber-500 to-orange-600 h-1.5 rounded-full transition-all duration-300"
                        style={{
                          width: `${(pkg.assets.filter(a => a.name).length / 10) * 100}%`
                        }}
                      ></div>
                    </div>
                    <p className="text-xs muted mt-1">
                      {pkg.assets.filter(a => a.name).length}/10 Assets
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
