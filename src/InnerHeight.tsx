import { useEffect } from "react";

export interface InnerHeightSettings {
  id: string;
  varName: string;
}

export interface InnerHeightProps {
  settings: InnerHeightSettings;
}

const getScript = (settings: InnerHeightSettings) => `
(function (){
  document.documentElement.style.setProperty(
    "${settings.varName}",
    \`\${window.innerHeight}px\`
  );
})();
`;

export const InnerHeightScript = ({ settings }: InnerHeightProps) => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: getScript(settings),
      }}
    />
  );
};

export const InnerHeightMeasure = ({ settings }: InnerHeightProps) => {
  return (
    <div
      id={settings.id}
      style={{ height: "100vh", width: 0, position: "absolute" }}
    ></div>
  );
};

export const useInnerHeight = (settings: InnerHeightSettings) => {
  useEffect(() => {
    const actualHeight = window.innerHeight;
    const elemHeight = document.getElementById(settings.id)?.clientHeight;
    if (elemHeight === undefined) {
      return;
    }

    const barHeight = elemHeight - actualHeight;
    const innerHeight = barHeight > 0 ? `calc(100vh - ${barHeight}px)` : "100vh";
    document.documentElement.style.setProperty(settings.varName, innerHeight);
  }, [settings]);
};
