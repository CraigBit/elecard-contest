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
    const result = [];
    for (let i = 0; i < response.length; i += 100) {
      result.push(response.slice(i, i + 100));
    }
    setTree(result);
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
          <TreeNode title='Root' key='0-0-0-0-0-0'>
            {tree.map((item, index) => {
              let title;
              if (index < 6) {
                title = `[${index * 100}-${index * 100 + 99}]`;
              } else {
                title = `[${index * 100}-${index * 100 + 59}]`;
              }
              return (
                <TreeNode title={title} key={index}>
                  {item.map((node, index) => {
                    const size = node.filesize;
                    const category = node.category;
                    const date = new Date(node.timestamp).toLocaleDateString(
                      'ru-RU'
                    );
                    const path = `http://contest.elecard.ru/frontend_data/${node.image}`;
                    const img = (
                      <a href={path} target='_blank' rel='noreferrer'>
                        <img src={path} alt='not found' style={imgStyle} />
                      </a>
                    );
                    return (
                      <TreeNode title={`${index}`} key={node.timestamp}>
                        <TreeNode
                          title={img}
                          key={`${
                            Date.now() + Math.random() * (99999 - 10) + 10
                          }`}
                        />
                        <TreeNode
                          title={size}
                          key={`${
                            Date.now() + Math.random() * (99999 - 10) + 10
                          }`}
                        />
                        <TreeNode
                          title={date}
                          key={`${
                            Date.now() + Math.random() * (99999 - 10) + 10
                          }`}
                        />
                        <TreeNode
                          title={category}
                          key={`${
                            Date.now() + Math.random() * (99999 - 10) + 10
                          }`}
                        />
                      </TreeNode>
                    );
                  })}
                </TreeNode>
              );
            })}
          </TreeNode>
        </Tree>
      )}
    </Fragment>
  );
};
