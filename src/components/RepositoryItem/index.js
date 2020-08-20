import React from 'react';

import "./styles.css";

function RepositoryItem({ id, title, handleRemoveRepository }) {
    return (
        <li>
            {title}

            <button onClick={() => handleRemoveRepository(id)}>
                Remover
                    </button>
        </li>
    )
}

export default RepositoryItem;