import { Col, Card } from 'react-bootstrap';
import close from '../../../src/img/close.png';
import './style.css';

export const CardItem = ({ item, deleteItem }) => {
  const path = `http://contest.elecard.ru/frontend_data/${item.image}`;
  const category = item.category[0].toUpperCase() + item.category.slice(1);
  const date = new Date(item.timestamp).toLocaleDateString('ru-RU');
  const imagePathName = item.image.match(/(?<=([a-z]\/))[a-z]+/)[0];
  const name = imagePathName[0].toUpperCase() + imagePathName.slice(1);
  return (
    <Col className='d-flex justify-content-center'>
      <Card className='rounded-0 card-cover border-0'>
        <Card.Img variant='top' src={path} className='rounded-0 card-img' />
        <div
          onClick={() => deleteItem(item)}
          className='position-absolute close-btn'>
          <img src={close} alt='' />
        </div>

        <Card.Body>
          <Card.Title className='d-flex justify-content-between align-items-baseline'>
            <span>{category}</span>
            <span>{name}</span>
          </Card.Title>
          <Card.Text className='d-flex justify-content-between align-items-baseline'>
            <span>Размер: {item.filesize}</span>
            <span>{date}</span>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};
