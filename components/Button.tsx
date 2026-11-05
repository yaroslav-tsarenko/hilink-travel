import Image from 'next/image';
import Link from 'next/link';

type ButtonProps = {
  type?: 'button' | 'submit';
  title: string;
  icon?: string;
  variant: string;
  full?: boolean;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({ type = 'button', title, icon, variant, full, href, onClick, disabled }: ButtonProps) => {
  const className = `flexCenter gap-3 rounded-full border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:opacity-60 ${variant} ${full ? 'w-full' : ''}`;
  const content = (
    <>
      {icon && <Image src={icon} alt="" width={24} height={24} />}
      <span className="bold-16 whitespace-nowrap">{title}</span>
    </>
  );
  if (href) {
    const external = href.startsWith('http');
    return (
      <Link href={href} className={className} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {content}
      </Link>
    );
  }
  return (
    <button className={className} type={type} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
};

export default Button;
