import type { Dispatch, ReactNode, SetStateAction } from 'react'
import type { Category } from '@/types/Category'

export type SearchOptionsType = {
  sortBy: string | null
  category: Category | null
  duration: number | Array<number> | null
  portions: number | Array<number> | null
  kcal: Array<number> | null
  fats: Array<number> | null
  carbs: Array<number> | null
  proteins: Array<number> | null
}

export interface SearchCardProps {
  options: SearchOptionsType
  setOptions: Dispatch<SetStateAction<SearchOptionsType>>
}

export interface ButtonFilterProps {
  name: 'duration' | 'portions'
  color: 'blue' | 'green'
  value: number | Array<number>
  children: ReactNode
  isActive: boolean
  setOptions: Dispatch<SetStateAction<SearchOptionsType>>
}

export interface CategoryFilterProps {
  setOptions: Dispatch<SetStateAction<SearchOptionsType>>
}

export interface RangeFilterProps {
  id: 'kcal' | 'fats' | 'carbs' | 'proteins'
  label: string
  max: number
  step: number
  value: Array<number> | null
  setOptions: Dispatch<SetStateAction<SearchOptionsType>>
}

export interface LabelFilterProps {
  children: ReactNode
}