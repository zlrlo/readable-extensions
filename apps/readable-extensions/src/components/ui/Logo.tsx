import LogoImage from '@extensions/assets/images/logo.svg';

const Logo = () => {
  return (
    <div className="w-11 h-11">
      <img src={LogoImage} alt="Logo" className="object-cover" />
    </div>
  );
};

export default Logo;
