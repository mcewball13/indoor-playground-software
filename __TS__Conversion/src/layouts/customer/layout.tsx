import { HeaderSimple as Header } from '../_common';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function CustomerLayout({ children }: Props) {
  return (
    <>
      <Header />

      {children}
    </>
  );
}
