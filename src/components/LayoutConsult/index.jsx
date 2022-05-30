

export const LayoutList=(usuarios)=> {
    const value = usuarios.value;
    return (
      <ul>
        {value.map((value) =>
              <li key={value.toString()}>
              {value}
            </li>
        )}
      </ul>
    );
  }