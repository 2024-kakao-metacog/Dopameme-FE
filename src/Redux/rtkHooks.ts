import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Redux/store/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
