/**
 *    Copyright 2018 Panjie Setiawan Wicaksono
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import { ComponentType } from 'react';


/**
 * These bunch of types are taken from
 * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11640#issuecomment-375942723
 * which is based on a Medium post
 * https://medium.com/@martin_hotell/ultimate-react-component-patterns-with-typescript-2-8-82990c516935
 *
 * It's for dealing with React Component/StatelessComponent default props.
 *
 * Usage:
 *
 * ```
 * interface IProps {
 *    required: number;
 *    defaulted: number;
 * }
 *
 * class Foo extends React.Component<IProps> {
 *    public static defaultProps = {
 *      defaulted: 0,
 *    };
 * }
 *
 * // Whichever way you prefer... The former does not require a function call
 * const FooWithDefaultProps = Foo as ComponentTypeWithDefaultProps<typeof Foo>;
 * const FooWithDefaultProps = withDefaultProps(Foo); // from withDefaultProps.js
 *
 * const f1 = <FooWithDefaultProps />;  // error: missing 'required' prop
 * const f2 = <FooWithDefaultProps defaulted={0} />;  // error: missing 'required' prop
 * const f3 = <FooWithDefaultProps required={0} />;  // ok
 * const f4 = <FooWithDefaultProps required={0} defaulted={0} />;  // ok
 * ```
 */

export type ExtractProps<T> = T extends ComponentType<infer Q> ? Q : never;
export type ExtractDefaultProps<T> = T extends { defaultProps?: infer Q }
  ? Q
  : never;
export type RequiredProps<P, DP> = Pick<P, Exclude<keyof P, keyof DP>>;
export type RequiredAndPartialDefaultProps<RP, DP> = Required<RP> & Partial<DP>;

export type ComponentTypeWithDefaultProps<T> = ComponentType<
  RequiredAndPartialDefaultProps<
    RequiredProps<ExtractProps<T>, ExtractDefaultProps<T>>,
    ExtractDefaultProps<T>
  >
>;
