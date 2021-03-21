import React from "react";
import Header from "./Header/Header";

export default function App({ children }: { children: JSX.Element }): JSX.Element {
   return (
      <div className="container">
         <Header />
         {children}
      </div>
   );
}