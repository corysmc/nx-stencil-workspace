import { Component, Prop, h } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first!: 'Jon' | 'John' | 'Jonathan';

  /**
   * The middle name
   */
  @Prop() middle!: string;

  /**
   * The last name
   */
  @Prop() last: string;

  /**
   * Toggle option
   */
  @Prop() toggle: boolean;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return (
      <div>
        <div>Hey, World Jojo! I'm {this.getText()}</div>
        Toggle: {`${this.toggle}`}
      </div>
    );
  }
}
