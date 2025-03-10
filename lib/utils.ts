import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format number to Indian currency format (e.g., ₹1,23,456.78)
export function formatIndianCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount)
}

// Format number to Indian number system (e.g., 1,23,456.78)
export function formatIndianNumber(num: number): string {
  return new Intl.NumberFormat("en-IN").format(num)
}

// Format to lakhs (e.g., 1.23 Lakhs)
export function formatLakhs(num: number): string {
  const lakhs = num / 100000
  return `${lakhs.toFixed(2)} Lakhs`
}

// Format to crores (e.g., 1.23 Crores)
export function formatCrores(num: number): string {
  const crores = num / 10000000
  return `${crores.toFixed(2)} Crores`
}

// Update the formatIndianValue function to correctly format values in Crores
export function formatIndianValue(num: number): string {
  if (num >= 10000000) {
    const crores = num / 10000000
    return `${crores.toFixed(2)} Cr`
  } else if (num >= 100000) {
    const lakhs = num / 100000
    return `${lakhs.toFixed(2)} Lakh`
  } else {
    return formatIndianNumber(num)
  }
}

