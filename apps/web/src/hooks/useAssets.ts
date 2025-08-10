import { useState, useCallback, useEffect } from 'react';
import { Asset } from '../types';
import { apiService, type ContentItem } from '../services/api';

export const useAssets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Transform ContentItem to Asset format
  const transformContentItemToAsset = (item: ContentItem): Asset => ({
    id: item.id, // Keep as string ID from backend
    name: item.name,
    platform: item.platform,
    status: item.status as Asset['status'],
    dropboxLink: item.dropboxLink,
    frameioLink: item.frameioLink,
    caption: item.caption,
    dawidDeadline: item.dawidDeadline,
    postingDate: item.postingDate,
    size: item.size,
    author: item.author,
    date: item.date,
  });

  // Load assets from API
  const loadAssets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getContentItems();
      const transformedAssets = response.data.map(transformContentItemToAsset);
      setAssets(transformedAssets);
    } catch (err) {
      setError('Fehler beim Laden der Assets');
      console.error('Error loading assets:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load assets on mount
  useEffect(() => {
    loadAssets();
  }, [loadAssets]);

  const updateAssetStatus = useCallback(async (assetId: string | number, newStatus: Asset['status']) => {
    try {
      // Find the asset
      const asset = assets.find(a => a.id === assetId);
      if (!asset) {
        throw new Error('Asset not found');
      }

      await apiService.updateContentStatus(asset.id.toString(), newStatus);
      
      // Update local state
      setAssets(prevAssets => 
        prevAssets.map(asset => 
          asset.id === assetId 
            ? { ...asset, status: newStatus }
            : asset
        )
      );
    } catch (err) {
      setError('Fehler beim Aktualisieren des Status');
      console.error('Error updating asset status:', err);
    }
  }, [assets]);

  const updateAssetCaption = useCallback(async (assetId: string | number, newCaption: string) => {
    try {
      // Find the asset
      const asset = assets.find(a => a.id === assetId);
      if (!asset) {
        throw new Error('Asset not found');
      }

      await apiService.updateContentCaption(asset.id.toString(), newCaption);
      
      // Update local state
      setAssets(prevAssets => 
        prevAssets.map(asset => 
          asset.id === assetId 
            ? { ...asset, caption: newCaption }
            : asset
        )
      );
    } catch (err) {
      setError('Fehler beim Aktualisieren der Caption');
      console.error('Error updating asset caption:', err);
    }
  }, [assets]);

  const updateAssetFrameioLink = useCallback(async (assetId: string | number, newLink: string) => {
    try {
      // Find the asset
      const asset = assets.find(a => a.id === assetId);
      if (!asset) {
        throw new Error('Asset not found');
      }

      await apiService.updateFrameioLink(asset.id.toString(), newLink);
      
      // Update local state
      setAssets(prevAssets => 
        prevAssets.map(asset => 
          asset.id === assetId 
            ? { ...asset, frameioLink: newLink }
            : asset
        )
      );
    } catch (err) {
      setError('Fehler beim Aktualisieren des Frame.io Links');
      console.error('Error updating frameio link:', err);
    }
  }, [assets]);

  const addAsset = useCallback(async (newAsset: Omit<Asset, 'id'>) => {
    try {
      const response = await apiService.createContentItem({
        title: newAsset.name,
        platform: newAsset.platform,
        brief: '', // Could be extended later
        plannedDate: newAsset.postingDate || undefined,
      });

      if (response.success) {
        // Reload assets to get the new one with proper ID
        await loadAssets();
      }
    } catch (err) {
      setError('Fehler beim Erstellen des Assets');
      console.error('Error creating asset:', err);
    }
  }, [loadAssets]);

  const deleteAsset = useCallback((assetId: number) => {
    // For now, just remove from local state
    // TODO: Implement delete API endpoint
    setAssets(prevAssets => prevAssets.filter(asset => asset.id !== assetId));
  }, []);

  const getAssetsByStatus = useCallback((status: Asset['status']) => {
    return assets.filter(asset => asset.status === status);
  }, [assets]);

  const getAssetsByPlatform = useCallback((platform: Asset['platform']) => {
    return assets.filter(asset => asset.platform === platform);
  }, [assets]);

  return {
    assets,
    loading,
    error,
    updateAssetStatus,
    updateAssetCaption,
    updateAssetFrameioLink,
    addAsset,
    deleteAsset,
    getAssetsByStatus,
    getAssetsByPlatform,
    refreshAssets: loadAssets,
  };
};
