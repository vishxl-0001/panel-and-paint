import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BusinessSettings, DayOfWeek } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNZPhone(phone: string): string {
  // Format +64 27 684 1468 for clean display
  return phone;
}

export function getWhatsAppUrl(phone: string, message: string = ''): string {
  // Clean phone to numeric only with country code
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(message || 'Hi Ngongotaha Panel & Paint, I would like to enquire about a quote for my vehicle.');
  return `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
}

export function getTelUrl(phone: string): string {
  return `tel:${phone.replace(/\s+/g, '')}`;
}

export interface ShopOpenStatus {
  isOpen: boolean;
  statusText: string;
  nextChangeText: string;
}

export function calculateShopStatus(hours: BusinessSettings['openingHours']): ShopOpenStatus {
  try {
    // NZ Timezone: Pacific/Auckland
    const nowNZ = new Date(new Date().toLocaleString('en-US', { timeZone: 'Pacific/Auckland' }));
    const days: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = days[nowNZ.getDay()];
    const todaySchedule = hours[currentDay];

    if (!todaySchedule || !todaySchedule.isOpen) {
      return {
        isOpen: false,
        statusText: 'Closed Today',
        nextChangeText: 'Reopens Monday morning (placeholder schedule)',
      };
    }

    const currentMinutes = nowNZ.getHours() * 60 + nowNZ.getMinutes();
    const [openH, openM] = todaySchedule.openTime.split(':').map(Number);
    const [closeH, closeM] = todaySchedule.closeTime.split(':').map(Number);
    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;

    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      const remainingMinutes = closeMinutes - currentMinutes;
      const hoursLeft = Math.floor(remainingMinutes / 60);
      const minsLeft = remainingMinutes % 60;
      const closingText = hoursLeft > 0 ? `Closes in ${hoursLeft}h ${minsLeft}m` : `Closes in ${minsLeft}m`;
      return {
        isOpen: true,
        statusText: 'Open Now',
        nextChangeText: `${closingText} (${todaySchedule.closeTime})`,
      };
    } else if (currentMinutes < openMinutes) {
      return {
        isOpen: false,
        statusText: 'Closed Now',
        nextChangeText: `Opens today at ${todaySchedule.openTime}`,
      };
    } else {
      return {
        isOpen: false,
        statusText: 'Closed for the Day',
        nextChangeText: `Opens tomorrow at 8:00 AM`,
      };
    }
  } catch (err) {
    return {
      isOpen: true,
      statusText: 'Open for Inquiries',
      nextChangeText: 'Call +64 27 684 1468',
    };
  }
}

export function isLowEndDevice(): boolean {
  if (typeof window === 'undefined') return false;

  // Check data saver
  const nav = navigator as any;
  if (nav.connection?.saveData === true) return true;

  // Check 2G/3G slow network
  if (nav.connection?.effectiveType && ['slow-2g', '2g', '3g'].includes(nav.connection.effectiveType)) {
    return true;
  }

  // Check CPU cores
  if (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) {
    return true;
  }

  // Check memory
  if (nav.deviceMemory && nav.deviceMemory <= 4) {
    return true;
  }

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true;
  }

  return false;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
