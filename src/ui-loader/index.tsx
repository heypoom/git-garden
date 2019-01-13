import Spinner from 'react-spinkit';
import { LoadingContainer, spinnerStyle } from './index';
export function Loader() {
  return (<LoadingContainer>
    <Spinner style={spinnerStyle} name="cube-grid" color="#2B3D50" />
  </LoadingContainer>);
}
