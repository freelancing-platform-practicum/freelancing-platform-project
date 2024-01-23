import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/context';
import { industryAndCategoryOptions } from '../../utils/constants';
import * as Api from '../../utils/Api';
import { Button } from '../Button/Button';
import './Card.css';

function Card({ cards, setCards, isFirstTab }) {
  const { currentUser, isAuthenticated } = useContext(Context);

  function definePrice(data) {
    if (data.hasOwnProperty('payrate')) {
      if (typeof data?.payrate === 'number' && data?.payrate !== 0) {
        return `${data?.payrate.toLocaleString('ru-RU')} ₽/час`;
      } else {
        return 'Не указана';
      }
    }

    // temporary
    if (data?.freelancer?.payrate) {
      if (typeof data?.freelancer?.payrate === 'number' && data?.freelancer?.payrate !== 0) {
        return `${data?.freelancer?.payrate.toLocaleString('ru-RU')} ₽/час`;
      } else {
        return 'Не указана';
      }
    }

    if (data?.ask_budget) {
      return 'Ожидает предложений';
    } else {
      return `${data?.budget.toLocaleString('ru-RU')} ₽`;
    }
  }

  function renderCardContent(data) {
    return (
      <>
        <div className="order-card__header-container">
          <div className="order-card__avatar-container">
            {(data?.user || data?.freelancer?.user) && (
              <div
                className="order-card__avatar"
                style={
                  (data?.avatar || data?.photo || data?.freelancer?.photo) && {
                    backgroundImage: `url('${
                      data?.avatar || data?.photo || data?.freelancer?.photo
                    }')`,
                  }
                }
              />
            )}
            <div className="orderCard__title-container">
              <h3 className="order-card__title">
                {data?.title ||
                  (data?.user && `${data?.user?.first_name} ${data?.user?.last_name}`) ||
                  `${data?.freelancer?.user?.first_name} ${data?.freelancer?.user?.last_name}`}
              </h3>
              <p className="order-card__direction">
                {industryAndCategoryOptions
                  .find((option) => {
                    if (data?.category) return option?.value === data?.category[0];
                    if (data?.categories) return option?.value === data?.categories[0]?.name;
                    if (data?.freelancer?.categories)
                      return option?.value === data?.freelancer?.categories[0]?.name;
                  })
                  ?.label.toLowerCase()}
              </p>
            </div>
          </div>
          <div className="order-card__price-wrapper">
            <p className="order-card__price">{definePrice(data)}</p>
          </div>
        </div>
        <p className="order-card__description">
          {data?.description || data?.about || data?.freelancer?.about}
        </p>
        <div className="order-card__tag-container">
          {(data?.stacks || data?.stack || data?.freelancer?.stacks)?.map((tag, index) => (
            <p key={index} className="order-card__tag">
              {tag?.name}
            </p>
          ))}
        </div>
      </>
    );
  }

  function handleRespond(id) {
    Api.respondToTask(id)
      .then(() => {
        setCards(
          cards.map((card) => {
            if (card.id === id) {
              return { ...card, is_responded: true };
            }
            return card;
          }),
        );
      })
      .catch(console.error);
  }

  if (cards.length === 0) {
    return <h4>По вашему запросу ничего не найдено</h4>;
  }

  return cards?.map((data, index) => (
    <div key={data?.id || index} className="order-card">
      {isAuthenticated ? (
        <Link
          to={
            data.hasOwnProperty('is_responded') ? `/order/${data?.id}` : `/freelancer/${data?.id}`
          }
        >
          {renderCardContent(data)}
        </Link>
      ) : (
        renderCardContent(data)
      )}

      {currentUser?.is_worker && isFirstTab && !data.is_responded && (
        <div className="order-card__respond-button-container">
          <Button
            text="Откликнуться"
            buttonSecondary={true}
            width={140}
            height={40}
            onClick={() => handleRespond(data?.id)}
          />
        </div>
      )}
    </div>
  ));
}

export { Card };
