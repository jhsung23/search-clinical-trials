import { Heading } from '@/components/common';
import { SearchBar } from '@/components/common/search';

const MainPage = () => {
  return (
    <>
      <Heading>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </Heading>
      <SearchBar />
    </>
  );
};

export default MainPage;
