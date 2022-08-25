import cl from '../loader/Loader.module.css';

export const Loader = () => {
  return (
    <div className='d-flex justify-content-center align-items-center mt-5'>
      <div className={cl.loader}></div>;
    </div>
  );
};
