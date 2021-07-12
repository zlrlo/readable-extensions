function OpenGraphImage() {
  const src = 'https://user-images.githubusercontent.com/68647194/125168170-056e3f80-e1df-11eb-8af8-de5395e38480.JPG';

  return (
    <div className="flex-none w-48 relative">
      <img src={src} alt="open-graph image" className="absolute inset-0 w-full h-full object-cover" />
    </div>
  );
}

export default OpenGraphImage;
