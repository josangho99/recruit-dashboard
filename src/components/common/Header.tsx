function Header({ title }: { title: string }) {
  return (
    <div className="flex flex-row items-center justify-between p-4">
      <span className="text-3xl font-bold">{title}</span>
    </div>
  );
}

export default Header;
