import { MultithreadItComponent } from 'multithread-it';

export class Component extends MultithreadItComponent {

  render(values) {
    const dataElement = data => <li>{data.title} - {data.description}</li>;
    return (
      <ul>
        {values.map(dataElement)}
      </ul>
    );
  }
}
