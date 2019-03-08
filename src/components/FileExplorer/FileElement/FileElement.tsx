import * as React from 'react';

export interface IProps {
  name: string;
  size: number;
  isDirectory: boolean;
}

export default class FileElement extends React.Component<IProps> {
  public render() {
    const { name, size, isDirectory } = this.props;

    const scale = 1024;
    const sizeMap = ["kb", "mb", "gb", "tb"];
    let actualSize = { size, unit: "b" };

    while (actualSize.size / scale > 1)
      actualSize = {
        size: actualSize.size / scale,
        unit: sizeMap[sizeMap.indexOf(actualSize.unit) + 1]
      };

    actualSize.size = Math.floor(actualSize.size);

    return [
      <span className={`name ${isDirectory ? "dir" : ""}`} key={`name`}>
        {name}
      </span>,
      <span className="size" key={`size`}>
        {!isDirectory
          ? [
              <span key="amount" className="amount">
                {actualSize.size}
              </span>,
              <span key="unit" className="unit">
                {actualSize.unit}
              </span>
            ]
          : null}
      </span>
    ];
  }
}
