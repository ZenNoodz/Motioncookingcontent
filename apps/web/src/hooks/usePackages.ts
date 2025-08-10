import { useState, useCallback } from 'react';
import { Package, PackageAsset } from '../types';
import { mockPackages } from '../utils/mockData';

export const usePackages = () => {
  const [packages, setPackages] = useState<Package[]>(mockPackages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateAssetProduced = useCallback((packageId: number, assetId: number, produced: boolean) => {
    setPackages(prevPackages => 
      prevPackages.map(pkg => 
        pkg.id === packageId 
          ? {
              ...pkg,
              assets: pkg.assets.map(asset => 
                asset.id === assetId 
                  ? { ...asset, produced }
                  : asset
              )
            }
          : pkg
      )
    );
  }, []);

  const updateAssetEdited = useCallback((packageId: number, assetId: number, edited: boolean) => {
    setPackages(prevPackages => 
      prevPackages.map(pkg => 
        pkg.id === packageId 
          ? {
              ...pkg,
              assets: pkg.assets.map(asset => 
                asset.id === assetId 
                  ? { ...asset, edited }
                  : asset
              )
            }
          : pkg
      )
    );
  }, []);

  const updateAssetName = useCallback((packageId: number, assetId: number, name: string) => {
    setPackages(prevPackages => 
      prevPackages.map(pkg => 
        pkg.id === packageId 
          ? {
              ...pkg,
              assets: pkg.assets.map(asset => 
                asset.id === assetId 
                  ? { ...asset, name }
                  : asset
              )
            }
          : pkg
      )
    );
  }, []);

  const createPackage = useCallback((name: string) => {
    const newPackage: Package = {
      id: Math.max(...packages.map(p => p.id)) + 1,
      name,
      createdDate: new Date().toISOString().split('T')[0],
      assets: Array(10).fill(null).map((_, i) => ({
        id: Date.now() + i,
        name: "",
        produced: false,
        edited: false
      }))
    };
    setPackages(prevPackages => [...prevPackages, newPackage]);
    return newPackage;
  }, [packages]);

  const deletePackage = useCallback((packageId: number) => {
    setPackages(prevPackages => prevPackages.filter(pkg => pkg.id !== packageId));
  }, []);

  const getPackageProgress = useCallback((packageId: number) => {
    const pkg = packages.find(p => p.id === packageId);
    if (!pkg) return { assigned: 0, produced: 0, edited: 0, total: 10 };

    const assigned = pkg.assets.filter(asset => asset.name.trim() !== '').length;
    const produced = pkg.assets.filter(asset => asset.produced).length;
    const edited = pkg.assets.filter(asset => asset.edited).length;

    return { assigned, produced, edited, total: pkg.assets.length };
  }, [packages]);

  const getPackageById = useCallback((packageId: number) => {
    return packages.find(pkg => pkg.id === packageId);
  }, [packages]);

  return {
    packages,
    loading,
    error,
    updateAssetProduced,
    updateAssetEdited,
    updateAssetName,
    createPackage,
    deletePackage,
    getPackageProgress,
    getPackageById
  };
};
