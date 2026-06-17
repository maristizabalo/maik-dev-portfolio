"use client";

import { ThemeProvider } from "next-themes";
import { useSyncExternalStore } from "react";
import Loading from "./Loading";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const Providers = ({ children, ...props }) => {
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  if (!mounted) {
    return <Loading />;
  }

  return <ThemeProvider {...props}>{children}</ThemeProvider>;
};

export default Providers;
