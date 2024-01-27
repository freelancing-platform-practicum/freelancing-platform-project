import { useContext } from 'react';
import { Context } from '../../context/context';
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';
import './CardList.css';

function CardList({
  firstTabData,
  setFirstTabData,
  firstTabNavigation,
  loadFirstTabPaginationData,
  secondTabData,
  secondTabNavigation,
  loadSecondTabPaginationData,
  isFirstTab,
}) {
  const { isAuthenticated } = useContext(Context);

  function handleFirstTabPagination({ currentTarget: { value } }) {
    loadFirstTabPaginationData(firstTabNavigation[value]);
    window.scrollTo({
      top: isAuthenticated ? 0 : 500,
      behavior: 'smooth',
    });
  }

  function handleSecondTabPagination({ currentTarget: { value } }) {
    loadSecondTabPaginationData(secondTabNavigation[value]);
    window.scrollTo({
      top: isAuthenticated ? 0 : 500,
      behavior: 'smooth',
    });
  }

  if (firstTabData || secondTabData) {
    return (
      <div className="card-list">
        {isFirstTab ? (
          <>
            <Card cards={firstTabData} setCards={setFirstTabData} isFirstTab={isFirstTab} />
            <div className="card-list__navigation">
              {firstTabNavigation.previous && (
                <Button
                  buttonSecondary={true}
                  buttonWhite={true}
                  width={289}
                  text="Предыдущая страница"
                  onClick={handleFirstTabPagination}
                  value="previous"
                />
              )}
              {firstTabNavigation.next && (
                <Button
                  buttonSecondary={true}
                  buttonWhite={true}
                  width={289}
                  text="Следующая страница"
                  onClick={handleFirstTabPagination}
                  value="next"
                />
              )}
            </div>
          </>
        ) : (
          <>
            <Card cards={secondTabData} isFirstTab={isFirstTab} />
            <div className="card-list__navigation">
              {secondTabNavigation.previous && (
                <Button
                  buttonSecondary={true}
                  buttonWhite={true}
                  width={289}
                  text="Предыдущая страница"
                  onClick={handleSecondTabPagination}
                  value="previous"
                />
              )}
              {secondTabNavigation.next && (
                <Button
                  buttonSecondary={true}
                  buttonWhite={true}
                  width={289}
                  text="Следующая страница"
                  onClick={handleFirstTabPagination}
                  value="next"
                />
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}

export { CardList };
