import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import './TagTitle.css';

function TagTitle(props) {
  const {
    title,
    tooltip,
    isDropdown,
    onDropdownIconClick,
    containDropdown = true,
  } = props;

  const [open, setOpen] = React.useState(false);

  return (
    <div className="tag-title">
      <h3
        className="title"
        onClick={onDropdownIconClick}
        style={{ cursor: containDropdown ? 'pointer' : 'auto' }}
      >
        {title}
      </h3>

      {containDropdown ? (
        <ArrowForwardIosIcon
          className={`dropdown-icon ${isDropdown ? 'dropdown' : 'pullup'}`}
          onClick={onDropdownIconClick}
        />
      ) : null}
      <Tooltip title={tooltip} arrow placement="top" open={open}>
        <HelpOutlineIcon
          className="help-icon"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        />
      </Tooltip>
    </div>
  );
}

export default TagTitle;
