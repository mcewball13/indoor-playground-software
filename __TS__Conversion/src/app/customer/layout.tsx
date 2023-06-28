'use client';

// components
import CustomerLayout from 'src/layouts/customer/layout';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <CustomerLayout>{children}</CustomerLayout>;
}
