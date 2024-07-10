import { ReactNode } from 'react';

const ControlElement = ({ children, title }: { children: ReactNode, title?: string }) => {
  return (
    <div id="control-panel-element">
      <div>
        {title ?? ''}
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default ControlElement;