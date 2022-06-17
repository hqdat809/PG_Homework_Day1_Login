import React, { memo } from 'react';

import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IDataItem } from 'models/home';

interface Props {
  item: IDataItem;
}

const ItemInfor = (props: Props) => {
  const { item } = props;

  console.log('rerender item: ', item.isLoading);
  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '800px', height: '200px' }}>
        <Box sx={{ margin: 1 }}>
          {item.isLoading ? (
            <Skeleton variant="rectangular">
              <div className="wrapper-img-item">
                <img className="img-item" src={item.url} />
              </div>
            </Skeleton>
          ) : (
            <div className="wrapper-img-item">
              <img className="img-item" src={item.url} />
            </div>
          )}
        </Box>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ width: '100%' }}>
            {item.isLoading ? (
              <Skeleton width="100%">
                <Typography>.</Typography>
              </Skeleton>
            ) : (
              <Typography>
                <h5 className="title-item">{item.title}</h5>
              </Typography>
            )}
          </Box>
          <Box sx={{ width: '100%' }}>
            {item.isLoading ? (
              <Skeleton width="100%">
                <Typography>.</Typography>
              </Skeleton>
            ) : (
              <Typography>
                <p className="title-item">{Date.now()}</p>
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default React.memo(ItemInfor);
