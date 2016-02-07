
export class Component {

  render(values) {
    const dataElement = data => <li>{data.title} - {data.description}</li>;
    return (
      <ul>
        {values.map(dataElement)}
      </ul>
    );
  }
}
