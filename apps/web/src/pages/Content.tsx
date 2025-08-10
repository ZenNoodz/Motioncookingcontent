import React, { useState, useEffect } from "react";
import { Upload, Instagram, Youtube, X } from "lucide-react";
import { apiService, type ContentItem } from "../services/api";
import { ContentViewType, Filters } from "../types";
import { getStatusColor, getStatusText, formatDate, groupAssetsByDate, getPaginatedItems, getTotalPages } from "../utils/statusHelpers";

interface ContentProps {
  contentView: ContentViewType;
}

export default function Content({ contentView }: ContentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    platform: 'all',
    status: 'all'
  });
  const [selectedAsset, setSelectedAsset] = useState<ContentItem | null>(null);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 15;

  // Load content items
  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await apiService.getContentItems();
        setContentItems(response.data);
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  // Update functions
  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await apiService.updateContentStatus(id, newStatus);
      // Update local state
      setContentItems(prev => 
        prev.map(item => 
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const updateCaption = async (id: string, newCaption: string, platform: string) => {
    try {
      await apiService.updateContentCaption(id, newCaption, platform);
      // Update local state
      setContentItems(prev => 
        prev.map(item => 
          item.id === id ? { ...item, caption: newCaption } : item
        )
      );
    } catch (error) {
      console.error('Error updating caption:', error);
    }
  };

  const updateFrameioLink = async (id: string, newUrl: string) => {
    try {
      await apiService.updateFrameioLink(id, newUrl);
      // Update local state
      setContentItems(prev => 
        prev.map(item => 
          item.id === id ? { ...item, frameioLink: newUrl } : item
        )
      );
    } catch (error) {
      console.error('Error updating Frame.io link:', error);
    }
  };

  // Asset Detail Modal
  const AssetDetailModal = ({ asset, onClose }: { asset: ContentItem; onClose: () => void }) => {
    const [editedCaption, setEditedCaption] = useState(asset.caption);
    const [editedFrameioLink, setEditedFrameioLink] = useState(asset.frameioLink);
    const [saving, setSaving] = useState(false);

    if (!asset) return null;

    const handleSave = async () => {
      setSaving(true);
      try {
        // Update caption if changed
        if (editedCaption !== asset.caption) {
          await updateCaption(asset.id, editedCaption, asset.platform);
        }
        
        // Update Frame.io link if changed
        if (editedFrameioLink !== asset.frameioLink) {
          await updateFrameioLink(asset.id, editedFrameioLink);
        }
        
        onClose();
      } catch (error) {
        console.error('Error saving changes:', error);
      } finally {
        setSaving(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 max-w-md w-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Asset Details</h3>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/60 hover:bg-white/80 flex items-center justify-center"
            >
              <X size={16} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {asset.platform === 'instagram' ? 
                <Instagram size={20} className="text-pink-600" /> : 
                <Youtube size={20} className="text-red-600" />
              }
              <span className="font-medium">{asset.name}</span>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Caption</label>
              <textarea 
                value={editedCaption}
                onChange={(e) => setEditedCaption(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/60 border border-white/20 text-sm"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Frame.io Link</label>
              <input 
                type="url"
                value={editedFrameioLink}
                onChange={(e) => setEditedFrameioLink(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/60 border border-white/20 text-sm"
              />
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-2 px-4 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50"
              >
                {saving ? 'Speichern...' : 'Speichern'}
              </button>
              <button 
                onClick={onClose}
                className="flex-1 py-2 px-4 rounded-lg bg-white/60 hover:bg-white/80 font-medium transition-all duration-200"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Listenansicht
  const renderListView = () => {
    const totalPages = getTotalPages(contentItems.length, itemsPerPage);
    const currentAssets = getPaginatedItems(contentItems, currentPage, itemsPerPage);

    return (
      <div className="card p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr className="border-b border-gray-300/25">
                <th className="text-left py-4 px-4 font-semibold border-r border-gray-300/25">Name</th>
                <th className="text-left py-4 px-4 font-semibold border-r border-gray-300/25">Dropbox Link</th>
                <th className="text-left py-4 px-4 font-semibold border-r border-gray-300/25">Dawid Deadline</th>
                <th className="text-left py-4 px-4 font-semibold border-r border-gray-300/25">Frame.io Link</th>
                <th className="text-left py-4 px-4 font-semibold border-r border-gray-300/25">Caption</th>
                <th className="text-left py-4 px-4 font-semibold border-r border-gray-300/25">Posting Datum</th>
                <th className="text-left py-4 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentAssets.map((asset) => (
                <tr key={asset.id} className="border-b border-gray-300/25 hover:bg-white/20 transition-colors">
                  <td className="py-4 px-4 border-r border-gray-300/25">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white flex-shrink-0">
                        {asset.platform === 'instagram' ? <Instagram size={16} /> : <Youtube size={16} />}
                      </div>
                      <span className="font-medium">{asset.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 border-r border-gray-300/25">
                    <a href={asset.dropboxLink} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:text-blue-800 text-sm underline">
                      Dropbox Link
                    </a>
                  </td>
                  <td className="py-4 px-4 text-sm border-r border-gray-300/25">
                    {formatDate(asset.dawidDeadline)}
                  </td>
                  <td className="py-4 px-4 border-r border-gray-300/25">
                    <a href={asset.frameioLink} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:text-blue-800 text-sm underline">
                      Frame.io Link
                    </a>
                  </td>
                  <td className="py-4 px-4 max-w-xs border-r border-gray-300/25">
                    <div className="text-sm truncate" title={asset.caption}>
                      {asset.caption}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm border-r border-gray-300/25">
                    {formatDate(asset.postingDate)}
                  </td>
                  <td className="py-4 px-4">
                    <select 
                      value={asset.status}
                      onChange={(e) => updateStatus(asset.id, e.target.value)}
                      className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(asset.status)} bg-transparent`}
                    >
                      <option value="neues-video-aida">Neues Video Aida</option>
                      <option value="in-arbeit">In Arbeit</option>
                      <option value="review">Review</option>
                      <option value="fertig">Fertig</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <button 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg bg-white/60 hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Zurück
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPage === page 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white' 
                  : 'bg-white/60 hover:bg-white/80'
              }`}
            >
              {page}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg bg-white/60 hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Weiter
          </button>
        </div>
      </div>
    );
  };

  // Kalenderansicht
  const renderCalendarView = () => {
    const daysInMonth = 31;
    const firstDay = new Date(2025, 0, 1).getDay();
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    const calendarDays = [];
    
    for (let i = 0; i < adjustedFirstDay; i++) {
      calendarDays.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day);
    }

    const assetsByDate = groupAssetsByDate(contentItems);

    return (
      <div className="card p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Januar 2025</h3>
          <p className="muted">Assets nach Posting-Datum</p>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day) => (
            <div key={day} className="p-2 text-center font-semibold text-sm muted">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => (
            <div key={index} className="min-h-[100px] p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
              {day && (
                <>
                  <div className="font-semibold text-sm mb-2">{day}</div>
                  <div className="space-y-1">
                    {assetsByDate[day]?.map((asset) => (
                      <div
                        key={asset.id}
                        onClick={() => setSelectedAsset(asset)}
                        className="p-1 rounded bg-gradient-to-r from-amber-500/20 to-orange-600/20 cursor-pointer hover:from-amber-500/30 hover:to-orange-600/30 transition-colors"
                      >
                        <div className="flex items-center gap-1">
                          {asset.platform === 'instagram' ? 
                            <Instagram size={12} className="text-pink-600" /> : 
                            <Youtube size={12} className="text-red-600" />
                          }
                          <span className="text-xs truncate">{asset.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">Content</h1>
            <p className="muted">Verwalte deine Content-Assets</p>
          </div>
        </div>
        <div className="card p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="muted">Lade Content-Assets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Content</h1>
          <p className="muted">Verwalte deine Content-Assets</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Upload size={16} />
          <span>Asset hochladen</span>
        </button>
      </div>

      {/* Empty State */}
      {contentItems.length === 0 ? (
        <div className="card p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center mx-auto mb-4">
            <Upload size={24} className="text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Keine Content-Assets vorhanden</h3>
          <p className="muted mb-4">Erstelle dein erstes Projekt, um Content-Assets zu verwalten.</p>
          <button className="btn-primary">
            Erstes Projekt erstellen
          </button>
        </div>
      ) : (
        <>
          {/* Ansicht basierend auf contentView */}
          {contentView === 'list' && renderListView()}
          {contentView === 'calendar' && renderCalendarView()}
          {contentView === 'filter' && renderListView()}
        </>
      )}

      {/* Asset Detail Modal */}
      {selectedAsset && (
        <AssetDetailModal 
          asset={selectedAsset} 
          onClose={() => setSelectedAsset(null)} 
        />
      )}
    </div>
  );
}
