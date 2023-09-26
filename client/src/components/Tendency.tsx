import formatNumber from '@/utils/formatNumber.ts';

interface TendencyItemProps {
  position: number;
  name: string;
  posts: number;
  theme?: string;
}

const TendencyItem: React.FC<TendencyItemProps> = ({ position, name, posts, theme }: TendencyItemProps) => (
  <div className="hover:bg-searchBarBackground transition p-2 rounded-10 cursor-pointer">
    <span className="text-xs text-gray-hashtag">{position}{theme ? ` • ${theme}` : ''}</span>
    <p className="text-text text-lg">{name}</p>
    <span className="text-xs text-gray-hashtag">{formatNumber(posts)} Tweets</span>
  </div>
);

const Tendency: React.FC = () => {
  const tendencies: TendencyItemProps[] = [
    {
      name: 'France',
      position: 1,
      posts: 332442,
      theme: "Sport",
    },
    {
      name: '#RugbyWorldCup',
      position: 2,
      posts: 232442,
      theme: "Sport",
    },
    {
      name: '#RWC2023',
      position: 3,
      posts: 123543,
      theme: "Sport",
    },
    {
      name: '#JO2024',
      position: 4,
      posts: 99999,
    },
  ];

  return (
    <div className="w-full bg-cardBackground rounded-card relative overflow-hidden p-3">
      <h2 className="text-text font-medium text-base">Trends in your country</h2>
      <div className="flex gap-3 flex-col">
        {tendencies.map((tendency, index) => (
          <TendencyItem key={index} {...tendency} />
        ))}
      </div>
    </div>
  );
};

export default Tendency;
