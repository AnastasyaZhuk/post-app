import React from 'react';
import Item from '../item';
import './post-list.css'

const PostList = ({posts, onDelete, onToggleLiked, onToggleImportant}) => {

    const elements = posts.map((item) => {
        const {id, ...itemProps}  = item
        return (
            <li key={id} className='list-group-item'>
                 <Item 
                    {...itemProps}
                    onDelete={() => onDelete(id)}
                    onToggleImportant={() => onToggleImportant(id, 'important')}
                    onToggleLiked={() => onToggleLiked(id, 'like')}
                    // label={item.label}
                    // important={item.important}
                    />    
            </li>
        )
    });

    return (
        <ul className="app-list list-group">
            {elements}   
        </ul>

    )
}

export default PostList;