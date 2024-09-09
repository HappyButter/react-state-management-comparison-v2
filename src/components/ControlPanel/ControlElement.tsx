import { ReactNode } from 'react';

const ControlElement = ({ children, title }: { children: ReactNode, title?: string | ReactNode }) => {
  return (
    <div className="control-panel-element">
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