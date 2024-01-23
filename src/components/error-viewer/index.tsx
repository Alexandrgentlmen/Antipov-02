import { useEffect } from 'react';

interface ErrorViewerProps {
  error: null | unknown;
}

const ErrorViewer = ({ error }: ErrorViewerProps) => {
  useEffect(() => {
    if (error !== null) {
      alert(JSON.stringify(error, null, 2));
    }
  }, [error]);

  return <></>;
};

export default ErrorViewer;
