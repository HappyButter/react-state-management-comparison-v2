import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store.ts'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const usePixelsDispatch = useDispatch.withTypes<AppDispatch>()
export const usePixelsSelector = useSelector.withTypes<RootState>()