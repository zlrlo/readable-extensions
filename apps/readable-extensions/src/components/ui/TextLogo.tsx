type TextLogoProps = {
  renderLogo: () => JSX.Element;
};

const TextLogo = ({ renderLogo }: TextLogoProps) => {
  return (
    <div className="flex items-center">
      {renderLogo()}
      <div className="text-2xl font-semibold text-indigo-900 ml-2">Readable</div>
    </div>
  );
};

export default TextLogo;
