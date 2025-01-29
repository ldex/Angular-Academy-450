import { Injectable, inject } from '@angular/core';
import { StorageService } from './storage.service';

interface CacheItem {
  data: any;
  timestamp: number;
}

interface CacheStorage {
  [key: string]: CacheItem;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private storageService = inject(StorageService);

  private readonly CACHE_KEY = 'app_cache';
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds
  private cache: CacheStorage = {};

  constructor() {
    this.loadCache();
  }

  private loadCache(): void {
    const storedCache = this.storageService.getItem<CacheStorage>(this.CACHE_KEY);
    if (storedCache) {
      // Clean up expired items during load
      const now = Date.now();
      Object.entries(storedCache).forEach(([key, item]) => {
        if (now <= item.timestamp) {
          this.cache[key] = item;
        }
      });
      this.saveCache();
    }
  }

  private saveCache(): void {
    this.storageService.setItem(this.CACHE_KEY, this.cache);
  }

  set(key: string, data: any, ttl: number = this.DEFAULT_TTL): void {
    this.cache[key] = {
      data,
      timestamp: Date.now() + ttl
    };
    this.saveCache();
  }

  get(key: string): any | null {
    const item = this.cache[key];
    if (!item) return null;

    if (Date.now() > item.timestamp) {
      delete this.cache[key];
      this.saveCache();
      return null;
    }

    return item.data;
  }

  clear(key?: string): void {
    if (key) {
      delete this.cache[key];
    } else {
      this.cache = {};
    }
    this.saveCache();
  }

  // Helper method to check if a key exists and is not expired
  has(key: string): boolean {
    const item = this.cache[key];
    if (!item) return false;

    if (Date.now() > item.timestamp) {
      delete this.cache[key];
      this.saveCache();
      return false;
    }

    return true;
  }
}