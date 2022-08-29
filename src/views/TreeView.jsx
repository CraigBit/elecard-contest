import { Fragment, useEffect, useState } from 'react';
import { useFetching } from '../hooks/useFetching';
import ItemService from '../api/ItemService';
import Tree, { TreeNode } from 'rc-tree';
import { Loader } from '../ui/loader/Loader';
import 'rc-tree/assets/index.css';

export const TreeView = () => {
  const [tree, setTree] = useState([]);

  const [fetchTree, isTreeLoading, treeError] = useFetching(async () => {
    const response = await ItemService.getAll();
    setTree(response);
  });

  useEffect(() => {
    fetchTree();
  }, []);

  const imgStyle = {
    width: '25px',
    height: '25px',
    objectFit: 'cover',
  };

  return (
    <Fragment>
      {treeError && <h1>Произошла ошибка...</h1>}
      {isTreeLoading ? (
        <Loader />
      ) : (
        <Tree
          showIcon={false}
          showLine
          selectable={false}
          expandAction='click'
          className='m-5'>
          <TreeNode title='Root' key='0-0'>
            {tree.map((item, index) => {
              const size = item.filesize;
              const category = item.category;
              const date = new Date(item.timestamp).toLocaleDateString('ru-RU');
              const path = `http://contest.elecard.ru/frontend_data/${item.image}`;
              const img = (
                <a href={path} target='_blank' rel='noreferrer'>
                  <img src={path} alt='not found' style={imgStyle} />
                </a>
              );
              return (
                <TreeNode title={`Элемент ${index + 1}`} key={item.timestamp}>
                  <TreeNode title={img} key={`0-0-${index + 5}-0`} />
                  <TreeNode title={size} key={`0-0-0-${index + 5}`} />
                  <TreeNode title={date} key={`${index + 5}-0-0-0`} />
                  <TreeNode title={category} key={`0-${index + 5}-0-0`} />
                </TreeNode>
              );
            })}
          </TreeNode>
        </Tree>
      )}
    </Fragment>
  );
};
