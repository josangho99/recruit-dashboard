function Header({ title }: { title: string }) {
  return (
    <div className="flex flex-row items-center justify-between p-4">
      <span className="text-3xl font-bold">{title}</span>
      <input className="rounded-2xl bg-white px-4 py-1.5" type="text" placeholder="Search"></input>
    </div>
  );
}

export default Header;
