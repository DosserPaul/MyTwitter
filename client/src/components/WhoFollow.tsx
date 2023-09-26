import LittleUser from '@/components/LittleUser.tsx';

const WhoFollow = () => (
  <div className="w-full bg-cardBackground rounded-card relative overflow-hidden flex flex-col p-4">
    <h2 className="text-text font-medium text-base">Who to Follow</h2>
    <div className="flex flex-col items-center mt-3 gap-4">
      <LittleUser />
      <LittleUser />
      <LittleUser />
    </div>
    <p className="text-link pt-3 cursor-pointer text-sm">Show more</p>
  </div>
);

export default WhoFollow;
