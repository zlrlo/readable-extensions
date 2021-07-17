import React from 'react';

type Props = React.PropsWithChildren<{
  backgroundColor: string;
  fontColor: string;
}>;

const Chip = (props: Props) => {
  const { backgroundColor, fontColor, children } = props;

  return <div className={`rounded-full py-1 px-2 text-xs ${backgroundColor} ${fontColor}`}>{children}</div>;
};

export default Chip;
