export interface Stock {
  date: Date;
  value: number;
}

export const STOCKS: Stock[] = [
  { date: new Date('2010-01-01'), value: 210.73 },
  { date: new Date('2010-01-04'), value: 214.01 },
  { date: new Date('2010-01-05'), value: 214.38 },
  { date: new Date('2010-01-06'), value: 210.97 },
  { date: new Date('2010-01-07'), value: 210.58 },
  { date: new Date('2010-01-08'), value: 211.98 },
  { date: new Date('2010-01-11'), value: 210.11 },
  { date: new Date('2010-01-12'), value: 207.72 },
  { date: new Date('2010-01-13'), value: 210.65 },
  { date: new Date('2010-01-14'), value: 209.43 },
  { date: new Date('2010-01-15'), value: 205.93 },
  { date: new Date('2010-01-18'), value: 205.93 },
  { date: new Date('2010-01-19'), value: 215.04 },
  { date: new Date('2010-01-20'), value: 211.72 },
  { date: new Date('2010-01-21'), value: 208.07 },
  { date: new Date('2010-01-22'), value: 197.75 },
  { date: new Date('2010-01-25'), value: 203.08 },
  { date: new Date('2010-01-26'), value: 205.94 },
  { date: new Date('2010-01-27'), value: 207.88 },
  { date: new Date('2010-01-28'), value: 199.29 },
  { date: new Date('2010-01-29'), value: 192.06 },
  { date: new Date('2010-02-01'), value: 194.73 },
  { date: new Date('2010-02-02'), value: 195.86 },
  { date: new Date('2010-02-03'), value: 199.23 },
  { date: new Date('2010-02-04'), value: 192.05 },
  { date: new Date('2010-02-05'), value: 195.46 },
  { date: new Date('2010-02-08'), value: 194.12 },
  { date: new Date('2010-02-09'), value: 196.19 },
  { date: new Date('2010-02-10'), value: 195.12 },
  { date: new Date('2010-02-11'), value: 198.67 },
  { date: new Date('2010-02-12'), value: 200.38 },
  { date: new Date('2010-02-15'), value: 200.38 },
  { date: new Date('2010-02-16'), value: 203.4 },
  { date: new Date('2010-02-17'), value: 202.55 },
  { date: new Date('2010-02-18'), value: 202.93 },
  { date: new Date('2010-02-19'), value: 201.67 },
  { date: new Date('2010-02-22'), value: 200.42 },
  { date: new Date('2010-02-23'), value: 197.06 },
  { date: new Date('2010-02-24'), value: 200.66 },
  { date: new Date('2010-02-25'), value: 202.0 },
  { date: new Date('2010-02-26'), value: 204.62 },
  { date: new Date('2010-03-01'), value: 208.99 },
  { date: new Date('2010-03-02'), value: 208.85 },
  { date: new Date('2010-03-03'), value: 209.33 },
  { date: new Date('2010-03-04'), value: 210.71 },
  { date: new Date('2010-03-05'), value: 218.95 },
  { date: new Date('2010-03-08'), value: 219.08 },
  { date: new Date('2010-03-09'), value: 223.02 },
  { date: new Date('2010-03-10'), value: 224.84 },
  { date: new Date('2010-03-11'), value: 225.5 },
  { date: new Date('2010-03-12'), value: 226.6 },
  { date: new Date('2010-03-15'), value: 223.84 },
  { date: new Date('2010-03-16'), value: 224.45 },
  { date: new Date('2010-03-17'), value: 224.12 },
  { date: new Date('2010-03-18'), value: 224.65 },
  { date: new Date('2010-03-19'), value: 222.25 },
  { date: new Date('2010-03-22'), value: 224.75 },
  { date: new Date('2010-03-23'), value: 228.36 },
  { date: new Date('2010-03-24'), value: 229.37 },
  { date: new Date('2010-03-25'), value: 226.65 },
  { date: new Date('2010-03-26'), value: 230.9 },
  { date: new Date('2010-03-29'), value: 232.39 },
  { date: new Date('2010-03-30'), value: 235.84 },
  { date: new Date('2010-03-31'), value: 235.0 },
  { date: new Date('2010-04-01'), value: 235.97 },
  { date: new Date('2010-04-02'), value: 235.97 },
  { date: new Date('2010-04-05'), value: 238.49 },
  { date: new Date('2010-04-06'), value: 239.54 },
  { date: new Date('2010-04-07'), value: 240.6 },
  { date: new Date('2010-04-08'), value: 239.95 },
  { date: new Date('2010-04-09'), value: 241.79 },
  { date: new Date('2010-04-12'), value: 242.29 },
  { date: new Date('2010-04-13'), value: 242.43 },
  { date: new Date('2010-04-14'), value: 245.69 },
  { date: new Date('2010-04-15'), value: 248.92 },
  { date: new Date('2010-04-16'), value: 247.4 },
  { date: new Date('2010-04-19'), value: 247.07 },
  { date: new Date('2010-04-20'), value: 244.59 },
  { date: new Date('2010-04-21'), value: 259.22 },
  { date: new Date('2010-04-22'), value: 266.47 },
  { date: new Date('2010-04-23'), value: 270.83 },
  { date: new Date('2010-04-26'), value: 269.5 },
  { date: new Date('2010-04-27'), value: 262.04 },
  { date: new Date('2010-04-28'), value: 261.6 },
  { date: new Date('2010-04-29'), value: 268.64 },
  { date: new Date('2010-04-30'), value: 261.09 },
  { date: new Date('2010-05-03'), value: 266.35 },
  { date: new Date('2010-05-04'), value: 258.68 },
  { date: new Date('2010-05-05'), value: 255.98 },
  { date: new Date('2010-05-06'), value: 246.25 },
  { date: new Date('2010-05-07'), value: 235.86 },
  { date: new Date('2010-05-10'), value: 253.99 },
  { date: new Date('2010-05-11'), value: 256.52 },
  { date: new Date('2010-05-12'), value: 262.09 },
  { date: new Date('2010-05-13'), value: 258.36 },
  { date: new Date('2010-05-14'), value: 253.82 },
  { date: new Date('2010-05-17'), value: 254.22 },
  { date: new Date('2010-05-18'), value: 252.36 },
  { date: new Date('2010-05-19'), value: 248.34 },
  { date: new Date('2010-05-20'), value: 237.76 },
  { date: new Date('2010-05-21'), value: 242.32 },
  { date: new Date('2010-05-24'), value: 246.76 },
  { date: new Date('2010-05-25'), value: 245.22 },
  { date: new Date('2010-05-26'), value: 244.11 },
  { date: new Date('2010-05-27'), value: 253.35 },
  { date: new Date('2010-05-28'), value: 256.88 },
  { date: new Date('2010-05-31'), value: 256.88 },
  { date: new Date('2010-06-01'), value: 260.83 },
  { date: new Date('2010-06-02'), value: 263.95 },
  { date: new Date('2010-06-03'), value: 263.12 },
  { date: new Date('2010-06-04'), value: 255.96 },
  { date: new Date('2010-06-07'), value: 250.94 },
  { date: new Date('2010-06-08'), value: 249.33 },
  { date: new Date('2010-06-09'), value: 243.2 },
  { date: new Date('2010-06-10'), value: 250.51 },
  { date: new Date('2010-06-11'), value: 253.51 },
  { date: new Date('2010-06-14'), value: 254.28 },
  { date: new Date('2010-06-15'), value: 259.69 },
  { date: new Date('2010-06-16'), value: 267.25 },
  { date: new Date('2010-06-17'), value: 271.87 },
  { date: new Date('2010-06-18'), value: 274.07 },
  { date: new Date('2010-06-21'), value: 270.17 },
  { date: new Date('2010-06-22'), value: 273.85 },
  { date: new Date('2010-06-23'), value: 270.97 },
  { date: new Date('2010-06-24'), value: 269.0 },
  { date: new Date('2010-06-25'), value: 266.7 },
  { date: new Date('2010-06-28'), value: 268.3 },
  { date: new Date('2010-06-29'), value: 256.17 },
  { date: new Date('2010-06-30'), value: 251.53 },
  { date: new Date('2010-07-01'), value: 248.48 },
  { date: new Date('2010-07-02'), value: 246.94 },
  { date: new Date('2010-07-05'), value: 246.94 },
  { date: new Date('2010-07-06'), value: 248.63 },
  { date: new Date('2010-07-07'), value: 258.66 },
  { date: new Date('2010-07-08'), value: 258.09 },
  { date: new Date('2010-07-09'), value: 259.62 },
  { date: new Date('2010-07-12'), value: 257.28 },
  { date: new Date('2010-07-13'), value: 251.8 },
  { date: new Date('2010-07-14'), value: 252.73 },
  { date: new Date('2010-07-15'), value: 251.45 },
  { date: new Date('2010-07-16'), value: 249.9 },
  { date: new Date('2010-07-19'), value: 245.58 },
  { date: new Date('2010-07-20'), value: 251.89 },
  { date: new Date('2010-07-21'), value: 254.24 },
  { date: new Date('2010-07-22'), value: 259.02 },
  { date: new Date('2010-07-23'), value: 259.94 },
  { date: new Date('2010-07-26'), value: 259.28 },
  { date: new Date('2010-07-27'), value: 264.08 },
  { date: new Date('2010-07-28'), value: 260.96 },
  { date: new Date('2010-07-29'), value: 258.11 },
  { date: new Date('2010-07-30'), value: 257.25 },
  { date: new Date('2010-08-02'), value: 261.85 },
  { date: new Date('2010-08-03'), value: 261.93 },
  { date: new Date('2010-08-04'), value: 262.98 },
  { date: new Date('2010-08-05'), value: 261.7 },
  { date: new Date('2010-08-06'), value: 260.09 },
  { date: new Date('2010-08-09'), value: 261.75 },
  { date: new Date('2010-08-10'), value: 259.41 },
  { date: new Date('2010-08-11'), value: 250.19 },
  { date: new Date('2010-08-12'), value: 251.79 },
  { date: new Date('2010-08-13'), value: 249.1 },
  { date: new Date('2010-08-16'), value: 247.64 },
  { date: new Date('2010-08-17'), value: 251.97 },
  { date: new Date('2010-08-18'), value: 253.07 },
  { date: new Date('2010-08-19'), value: 249.88 },
  { date: new Date('2010-08-20'), value: 249.64 },
  { date: new Date('2010-08-23'), value: 245.8 },
  { date: new Date('2010-08-24'), value: 239.93 },
  { date: new Date('2010-08-25'), value: 242.89 },
  { date: new Date('2010-08-26'), value: 240.28 },
  { date: new Date('2010-08-27'), value: 241.62 },
  { date: new Date('2010-08-30'), value: 242.5 },
  { date: new Date('2010-08-31'), value: 243.1 },
  { date: new Date('2010-09-01'), value: 250.33 },
  { date: new Date('2010-09-02'), value: 252.17 },
  { date: new Date('2010-09-03'), value: 258.77 },
  { date: new Date('2010-09-06'), value: 258.77 },
  { date: new Date('2010-09-07'), value: 257.81 },
  { date: new Date('2010-09-08'), value: 262.92 },
  { date: new Date('2010-09-09'), value: 263.07 },
  { date: new Date('2010-09-10'), value: 263.41 },
  { date: new Date('2010-09-13'), value: 267.04 },
  { date: new Date('2010-09-14'), value: 268.06 },
  { date: new Date('2010-09-15'), value: 270.22 },
  { date: new Date('2010-09-16'), value: 276.57 },
  { date: new Date('2010-09-17'), value: 275.37 },
  { date: new Date('2010-09-20'), value: 283.23 },
  { date: new Date('2010-09-21'), value: 283.77 },
  { date: new Date('2010-09-22'), value: 287.75 },
  { date: new Date('2010-09-23'), value: 288.92 },
  { date: new Date('2010-09-24'), value: 292.32 },
  { date: new Date('2010-09-27'), value: 291.16 },
  { date: new Date('2010-09-28'), value: 286.86 },
  { date: new Date('2010-09-29'), value: 287.37 },
  { date: new Date('2010-09-30'), value: 283.75 },
  { date: new Date('2010-10-01'), value: 282.52 },
  { date: new Date('2010-10-04'), value: 278.64 },
  { date: new Date('2010-10-05'), value: 288.94 },
  { date: new Date('2010-10-06'), value: 289.19 },
  { date: new Date('2010-10-07'), value: 289.22 },
  { date: new Date('2010-10-08'), value: 294.07 },
  { date: new Date('2010-10-11'), value: 295.36 },
  { date: new Date('2010-10-12'), value: 298.54 },
  { date: new Date('2010-10-13'), value: 300.14 },
  { date: new Date('2010-10-14'), value: 302.31 },
  { date: new Date('2010-10-15'), value: 314.74 },
  { date: new Date('2010-10-18'), value: 318.0 },
  { date: new Date('2010-10-19'), value: 309.49 },
  { date: new Date('2010-10-20'), value: 310.53 },
  { date: new Date('2010-10-21'), value: 309.52 },
  { date: new Date('2010-10-22'), value: 307.47 },
  { date: new Date('2010-10-25'), value: 308.84 },
  { date: new Date('2010-10-26'), value: 308.05 },
  { date: new Date('2010-10-27'), value: 307.83 },
  { date: new Date('2010-10-28'), value: 305.24 },
  { date: new Date('2010-10-29'), value: 300.98 },
  { date: new Date('2010-11-01'), value: 304.18 },
  { date: new Date('2010-11-02'), value: 309.36 },
  { date: new Date('2010-11-03'), value: 312.8 },
  { date: new Date('2010-11-04'), value: 318.27 },
  { date: new Date('2010-11-05'), value: 317.13 },
  { date: new Date('2010-11-08'), value: 318.62 },
  { date: new Date('2010-11-09'), value: 316.08 },
  { date: new Date('2010-11-10'), value: 318.03 },
  { date: new Date('2010-11-11'), value: 316.66 },
  { date: new Date('2010-11-12'), value: 308.03 },
  { date: new Date('2010-11-15'), value: 307.04 },
  { date: new Date('2010-11-16'), value: 301.59 },
  { date: new Date('2010-11-17'), value: 300.5 },
  { date: new Date('2010-11-18'), value: 308.43 },
  { date: new Date('2010-11-19'), value: 306.73 },
  { date: new Date('2010-11-22'), value: 313.36 },
  { date: new Date('2010-11-23'), value: 308.73 },
  { date: new Date('2010-11-24'), value: 314.8 },
  { date: new Date('2010-11-26'), value: 315.0 },
  { date: new Date('2010-11-29'), value: 316.87 },
  { date: new Date('2010-11-30'), value: 311.15 },
  { date: new Date('2010-12-01'), value: 316.4 },
  { date: new Date('2010-12-02'), value: 318.15 },
  { date: new Date('2010-12-03'), value: 317.44 },
  { date: new Date('2010-12-06'), value: 320.15 },
  { date: new Date('2010-12-07'), value: 318.21 },
  { date: new Date('2010-12-08'), value: 321.01 },
  { date: new Date('2010-12-09'), value: 319.76 },
  { date: new Date('2010-12-10'), value: 320.56 },
  { date: new Date('2010-12-13'), value: 321.67 },
  { date: new Date('2010-12-14'), value: 320.29 },
  { date: new Date('2010-12-15'), value: 320.36 },
  { date: new Date('2010-12-16'), value: 321.25 },
  { date: new Date('2010-12-17'), value: 320.61 },
  { date: new Date('2010-12-20'), value: 322.21 },
  { date: new Date('2010-12-21'), value: 324.2 },
  { date: new Date('2010-12-22'), value: 325.16 },
  { date: new Date('2010-12-23'), value: 323.6 },
  { date: new Date('2010-12-27'), value: 324.68 },
  { date: new Date('2010-12-28'), value: 325.47 },
  { date: new Date('2010-12-29'), value: 325.29 },
  { date: new Date('2010-12-30'), value: 323.66 },
  { date: new Date('2010-12-31'), value: 322.56 },
  { date: new Date('2011-01-03'), value: 329.57 },
  { date: new Date('2011-01-04'), value: 331.29 },
  { date: new Date('2011-01-05'), value: 334.0 },
  { date: new Date('2011-01-06'), value: 333.73 },
  { date: new Date('2011-01-07'), value: 336.12 },
  { date: new Date('2011-01-10'), value: 342.46 },
  { date: new Date('2011-01-11'), value: 341.64 },
  { date: new Date('2011-01-12'), value: 344.42 },
  { date: new Date('2011-01-13'), value: 345.68 },
  { date: new Date('2011-01-14'), value: 348.48 },
  { date: new Date('2011-01-18'), value: 340.65 },
  { date: new Date('2011-01-19'), value: 338.84 },
  { date: new Date('2011-01-20'), value: 332.68 },
  { date: new Date('2011-01-21'), value: 326.72 },
  { date: new Date('2011-01-24'), value: 337.45 },
  { date: new Date('2011-01-25'), value: 341.4 },
  { date: new Date('2011-01-26'), value: 343.85 },
  { date: new Date('2011-01-27'), value: 343.21 },
  { date: new Date('2011-01-28'), value: 336.1 },
  { date: new Date('2011-01-31'), value: 339.32 },
  { date: new Date('2011-02-01'), value: 345.03 },
  { date: new Date('2011-02-02'), value: 344.32 },
  { date: new Date('2011-02-03'), value: 343.44 },
  { date: new Date('2011-02-04'), value: 346.5 },
  { date: new Date('2011-02-07'), value: 351.88 },
  { date: new Date('2011-02-08'), value: 355.2 },
  { date: new Date('2011-02-09'), value: 358.16 },
  { date: new Date('2011-02-10'), value: 354.54 },
  { date: new Date('2011-02-11'), value: 356.85 },
  { date: new Date('2011-02-14'), value: 359.18 },
  { date: new Date('2011-02-15'), value: 359.9 },
  { date: new Date('2011-02-16'), value: 363.13 },
  { date: new Date('2011-02-17'), value: 358.3 },
  { date: new Date('2011-02-18'), value: 350.56 },
  { date: new Date('2011-02-22'), value: 338.61 },
  { date: new Date('2011-02-23'), value: 342.62 },
  { date: new Date('2011-02-24'), value: 342.88 },
  { date: new Date('2011-02-25'), value: 348.16 },
  { date: new Date('2011-02-28'), value: 353.21 },
  { date: new Date('2011-03-01'), value: 349.31 },
  { date: new Date('2011-03-02'), value: 352.12 },
  { date: new Date('2011-03-03'), value: 359.56 },
  { date: new Date('2011-03-04'), value: 360.0 },
  { date: new Date('2011-03-07'), value: 355.36 },
  { date: new Date('2011-03-08'), value: 355.76 },
  { date: new Date('2011-03-09'), value: 352.47 },
  { date: new Date('2011-03-10'), value: 346.67 },
  { date: new Date('2011-03-11'), value: 351.99 },
  { date: new Date('2011-03-14'), value: 353.56 },
  { date: new Date('2011-03-15'), value: 345.43 },
  { date: new Date('2011-03-16'), value: 330.01 },
  { date: new Date('2011-03-17'), value: 334.64 },
  { date: new Date('2011-03-18'), value: 330.67 },
  { date: new Date('2011-03-21'), value: 339.3 },
  { date: new Date('2011-03-22'), value: 341.2 },
  { date: new Date('2011-03-23'), value: 339.19 },
  { date: new Date('2011-03-24'), value: 344.97 },
  { date: new Date('2011-03-25'), value: 351.54 },
  { date: new Date('2011-03-28'), value: 350.44 },
  { date: new Date('2011-03-29'), value: 350.96 },
  { date: new Date('2011-03-30'), value: 348.63 },
  { date: new Date('2011-03-31'), value: 348.51 },
  { date: new Date('2011-04-01'), value: 344.56 },
  { date: new Date('2011-04-04'), value: 341.19 },
  { date: new Date('2011-04-05'), value: 338.89 },
  { date: new Date('2011-04-06'), value: 338.04 },
  { date: new Date('2011-04-07'), value: 338.08 },
  { date: new Date('2011-04-08'), value: 335.06 },
  { date: new Date('2011-04-11'), value: 330.8 },
  { date: new Date('2011-04-12'), value: 332.4 },
  { date: new Date('2011-04-13'), value: 336.13 },
  { date: new Date('2011-04-14'), value: 332.42 },
  { date: new Date('2011-04-15'), value: 327.46 },
  { date: new Date('2011-04-18'), value: 331.85 },
  { date: new Date('2011-04-19'), value: 337.86 },
  { date: new Date('2011-04-20'), value: 342.41 },
  { date: new Date('2011-04-21'), value: 350.7 },
  { date: new Date('2011-04-25'), value: 353.01 },
  { date: new Date('2011-04-26'), value: 350.42 },
  { date: new Date('2011-04-27'), value: 350.15 },
  { date: new Date('2011-04-28'), value: 346.75 },
  { date: new Date('2011-04-29'), value: 350.13 },
  { date: new Date('2011-05-02'), value: 346.28 },
  { date: new Date('2011-05-03'), value: 348.2 },
  { date: new Date('2011-05-04'), value: 349.57 },
  { date: new Date('2011-05-05'), value: 346.75 },
  { date: new Date('2011-05-06'), value: 346.66 },
  { date: new Date('2011-05-09'), value: 347.6 },
  { date: new Date('2011-05-10'), value: 349.45 },
  { date: new Date('2011-05-11'), value: 347.23 },
  { date: new Date('2011-05-12'), value: 346.57 },
  { date: new Date('2011-05-13'), value: 340.5 },
  { date: new Date('2011-05-16'), value: 333.3 },
  { date: new Date('2011-05-17'), value: 336.14 },
  { date: new Date('2011-05-18'), value: 339.87 },
  { date: new Date('2011-05-19'), value: 340.53 },
  { date: new Date('2011-05-20'), value: 335.22 },
  { date: new Date('2011-05-23'), value: 334.4 },
  { date: new Date('2011-05-24'), value: 332.19 },
  { date: new Date('2011-05-25'), value: 336.78 },
  { date: new Date('2011-05-26'), value: 335.0 },
  { date: new Date('2011-05-27'), value: 337.41 },
  { date: new Date('2011-05-31'), value: 347.83 },
  { date: new Date('2011-06-01'), value: 345.51 },
  { date: new Date('2011-06-02'), value: 346.1 },
  { date: new Date('2011-06-03'), value: 343.44 },
  { date: new Date('2011-06-06'), value: 338.04 },
  { date: new Date('2011-06-07'), value: 332.04 },
  { date: new Date('2011-06-08'), value: 332.24 },
  { date: new Date('2011-06-09'), value: 331.49 },
  { date: new Date('2011-06-10'), value: 325.9 },
  { date: new Date('2011-06-13'), value: 326.6 },
  { date: new Date('2011-06-14'), value: 332.44 },
  { date: new Date('2011-06-15'), value: 326.75 },
  { date: new Date('2011-06-16'), value: 325.16 },
  { date: new Date('2011-06-17'), value: 320.26 },
  { date: new Date('2011-06-20'), value: 315.32 },
  { date: new Date('2011-06-21'), value: 325.3 },
  { date: new Date('2011-06-22'), value: 322.61 },
  { date: new Date('2011-06-23'), value: 331.23 },
  { date: new Date('2011-06-24'), value: 326.35 },
  { date: new Date('2011-06-27'), value: 332.04 },
  { date: new Date('2011-06-28'), value: 335.26 },
  { date: new Date('2011-06-29'), value: 334.04 },
  { date: new Date('2011-06-30'), value: 335.67 },
  { date: new Date('2011-07-01'), value: 343.26 },
  { date: new Date('2011-07-05'), value: 349.43 },
  { date: new Date('2011-07-06'), value: 351.76 },
  { date: new Date('2011-07-07'), value: 357.2 },
  { date: new Date('2011-07-08'), value: 359.71 },
  { date: new Date('2011-07-11'), value: 354.0 },
  { date: new Date('2011-07-12'), value: 353.75 },
  { date: new Date('2011-07-13'), value: 358.02 },
  { date: new Date('2011-07-14'), value: 357.77 },
  { date: new Date('2011-07-15'), value: 364.92 },
  { date: new Date('2011-07-18'), value: 373.8 },
  { date: new Date('2011-07-19'), value: 376.85 },
  { date: new Date('2011-07-20'), value: 386.9 },
  { date: new Date('2011-07-21'), value: 387.29 },
  { date: new Date('2011-07-22'), value: 393.3 },
  { date: new Date('2011-07-25'), value: 398.5 },
  { date: new Date('2011-07-26'), value: 403.41 },
  { date: new Date('2011-07-27'), value: 392.59 },
  { date: new Date('2011-07-28'), value: 391.82 },
  { date: new Date('2011-07-29'), value: 390.48 },
  { date: new Date('2011-08-01'), value: 396.75 },
  { date: new Date('2011-08-02'), value: 388.91 },
  { date: new Date('2011-08-03'), value: 392.57 },
  { date: new Date('2011-08-04'), value: 377.37 },
  { date: new Date('2011-08-05'), value: 373.62 },
  { date: new Date('2011-08-08'), value: 353.21 },
  { date: new Date('2011-08-09'), value: 374.01 },
  { date: new Date('2011-08-10'), value: 363.69 },
  { date: new Date('2011-08-11'), value: 373.7 },
  { date: new Date('2011-08-12'), value: 376.99 },
  { date: new Date('2011-08-15'), value: 383.41 },
  { date: new Date('2011-08-16'), value: 380.48 },
  { date: new Date('2011-08-17'), value: 380.44 },
  { date: new Date('2011-08-18'), value: 366.05 },
  { date: new Date('2011-08-19'), value: 356.03 },
  { date: new Date('2011-08-22'), value: 356.44 },
  { date: new Date('2011-08-23'), value: 373.6 },
  { date: new Date('2011-08-24'), value: 376.18 },
  { date: new Date('2011-08-25'), value: 373.72 },
  { date: new Date('2011-08-26'), value: 383.58 },
  { date: new Date('2011-08-29'), value: 389.97 },
  { date: new Date('2011-08-30'), value: 389.99 },
  { date: new Date('2011-08-31'), value: 384.83 },
  { date: new Date('2011-09-01'), value: 381.03 },
  { date: new Date('2011-09-02'), value: 374.05 },
  { date: new Date('2011-09-06'), value: 379.74 },
  { date: new Date('2011-09-07'), value: 383.93 },
  { date: new Date('2011-09-08'), value: 384.14 },
  { date: new Date('2011-09-09'), value: 377.48 },
  { date: new Date('2011-09-12'), value: 379.94 },
  { date: new Date('2011-09-13'), value: 384.62 },
  { date: new Date('2011-09-14'), value: 389.3 },
  { date: new Date('2011-09-15'), value: 392.96 },
  { date: new Date('2011-09-16'), value: 400.5 },
  { date: new Date('2011-09-19'), value: 411.63 },
  { date: new Date('2011-09-20'), value: 413.45 },
  { date: new Date('2011-09-21'), value: 412.14 },
  { date: new Date('2011-09-22'), value: 401.82 },
  { date: new Date('2011-09-23'), value: 404.3 },
  { date: new Date('2011-09-26'), value: 403.17 },
  { date: new Date('2011-09-27'), value: 399.26 },
  { date: new Date('2011-09-28'), value: 397.01 },
  { date: new Date('2011-09-29'), value: 390.57 },
  { date: new Date('2011-09-30'), value: 381.32 },
  { date: new Date('2011-10-03'), value: 374.6 },
  { date: new Date('2011-10-04'), value: 372.5 },
  { date: new Date('2011-10-05'), value: 378.25 },
  { date: new Date('2011-10-06'), value: 377.37 },
  { date: new Date('2011-10-07'), value: 369.8 },
  { date: new Date('2011-10-10'), value: 388.81 },
  { date: new Date('2011-10-11'), value: 400.29 },
  { date: new Date('2011-10-12'), value: 402.19 },
  { date: new Date('2011-10-13'), value: 408.43 },
  { date: new Date('2011-10-14'), value: 422.0 },
  { date: new Date('2011-10-17'), value: 419.99 },
  { date: new Date('2011-10-18'), value: 422.24 },
  { date: new Date('2011-10-19'), value: 398.62 },
  { date: new Date('2011-10-20'), value: 395.31 },
  { date: new Date('2011-10-21'), value: 392.87 },
  { date: new Date('2011-10-24'), value: 405.77 },
  { date: new Date('2011-10-25'), value: 397.77 },
  { date: new Date('2011-10-26'), value: 400.6 },
  { date: new Date('2011-10-27'), value: 404.69 },
  { date: new Date('2011-10-28'), value: 404.95 },
  { date: new Date('2011-10-31'), value: 404.78 },
  { date: new Date('2011-11-01'), value: 396.51 },
  { date: new Date('2011-11-02'), value: 397.41 },
  { date: new Date('2011-11-03'), value: 403.07 },
  { date: new Date('2011-11-04'), value: 400.24 },
  { date: new Date('2011-11-07'), value: 399.73 },
  { date: new Date('2011-11-08'), value: 406.23 },
  { date: new Date('2011-11-09'), value: 395.28 },
  { date: new Date('2011-11-10'), value: 385.22 },
  { date: new Date('2011-11-11'), value: 384.62 },
  { date: new Date('2011-11-14'), value: 379.26 },
  { date: new Date('2011-11-15'), value: 388.83 },
  { date: new Date('2011-11-16'), value: 384.77 },
  { date: new Date('2011-11-17'), value: 377.41 },
  { date: new Date('2011-11-18'), value: 374.94 },
  { date: new Date('2011-11-21'), value: 369.01 },
  { date: new Date('2011-11-22'), value: 376.51 },
  { date: new Date('2011-11-23'), value: 366.99 },
  { date: new Date('2011-11-25'), value: 363.57 },
  { date: new Date('2011-11-28'), value: 376.12 },
  { date: new Date('2011-11-29'), value: 373.2 },
  { date: new Date('2011-11-30'), value: 382.2 },
  { date: new Date('2011-12-01'), value: 387.93 },
  { date: new Date('2011-12-02'), value: 389.7 },
  { date: new Date('2011-12-05'), value: 393.01 },
  { date: new Date('2011-12-06'), value: 390.95 },
  { date: new Date('2011-12-07'), value: 389.09 },
  { date: new Date('2011-12-08'), value: 390.66 },
  { date: new Date('2011-12-09'), value: 393.62 },
  { date: new Date('2011-12-12'), value: 391.84 },
  { date: new Date('2011-12-13'), value: 388.81 },
  { date: new Date('2011-12-14'), value: 380.19 },
  { date: new Date('2011-12-15'), value: 378.94 },
  { date: new Date('2011-12-16'), value: 381.02 },
  { date: new Date('2011-12-19'), value: 382.21 },
  { date: new Date('2011-12-20'), value: 395.95 },
  { date: new Date('2011-12-21'), value: 396.44 },
  { date: new Date('2011-12-22'), value: 398.55 },
  { date: new Date('2011-12-23'), value: 403.43 },
  { date: new Date('2011-12-27'), value: 406.53 },
  { date: new Date('2011-12-28'), value: 402.64 },
  { date: new Date('2011-12-29'), value: 405.12 },
  { date: new Date('2011-12-30'), value: 405.0 },
  { date: new Date('2012-01-03'), value: 411.23 },
  { date: new Date('2012-01-04'), value: 413.44 },
  { date: new Date('2012-01-05'), value: 418.03 },
  { date: new Date('2012-01-06'), value: 422.4 },
  { date: new Date('2012-01-09'), value: 421.73 },
  { date: new Date('2012-01-10'), value: 423.24 },
  { date: new Date('2012-01-11'), value: 422.55 },
  { date: new Date('2012-01-12'), value: 421.39 },
  { date: new Date('2012-01-13'), value: 419.81 },
  { date: new Date('2012-01-17'), value: 424.7 },
  { date: new Date('2012-01-18'), value: 429.11 },
  { date: new Date('2012-01-19'), value: 427.75 },
  { date: new Date('2012-01-20'), value: 420.3 },
  { date: new Date('2012-01-23'), value: 427.41 },
  { date: new Date('2012-01-24'), value: 420.41 },
  { date: new Date('2012-01-25'), value: 446.66 },
  { date: new Date('2012-01-26'), value: 444.63 },
  { date: new Date('2012-01-27'), value: 447.28 },
  { date: new Date('2012-01-30'), value: 453.01 },
  { date: new Date('2012-01-31'), value: 456.48 },
  { date: new Date('2012-02-01'), value: 456.19 },
  { date: new Date('2012-02-02'), value: 455.12 },
  { date: new Date('2012-02-03'), value: 459.68 },
  { date: new Date('2012-02-06'), value: 463.97 },
  { date: new Date('2012-02-07'), value: 468.83 },
  { date: new Date('2012-02-08'), value: 476.68 },
  { date: new Date('2012-02-09'), value: 493.17 },
  { date: new Date('2012-02-10'), value: 493.42 },
  { date: new Date('2012-02-13'), value: 502.6 },
  { date: new Date('2012-02-14'), value: 509.46 },
  { date: new Date('2012-02-15'), value: 497.67 },
  { date: new Date('2012-02-16'), value: 502.21 },
  { date: new Date('2012-02-17'), value: 502.12 },
  { date: new Date('2012-02-21'), value: 514.85 },
  { date: new Date('2012-02-22'), value: 513.04 },
  { date: new Date('2012-02-23'), value: 516.39 },
  { date: new Date('2012-02-24'), value: 522.41 },
  { date: new Date('2012-02-27'), value: 525.76 },
  { date: new Date('2012-02-28'), value: 535.41 },
  { date: new Date('2012-02-29'), value: 542.44 },
  { date: new Date('2012-03-01'), value: 544.47 },
  { date: new Date('2012-03-02'), value: 545.18 },
  { date: new Date('2012-03-05'), value: 533.16 },
  { date: new Date('2012-03-06'), value: 530.26 },
  { date: new Date('2012-03-07'), value: 530.69 },
  { date: new Date('2012-03-08'), value: 541.99 },
  { date: new Date('2012-03-09'), value: 545.17 },
  { date: new Date('2012-03-12'), value: 552.0 },
  { date: new Date('2012-03-13'), value: 568.1 },
  { date: new Date('2012-03-14'), value: 589.58 },
  { date: new Date('2012-03-15'), value: 585.56 },
  { date: new Date('2012-03-16'), value: 585.57 },
  { date: new Date('2012-03-19'), value: 601.1 },
  { date: new Date('2012-03-20'), value: 605.96 },
  { date: new Date('2012-03-21'), value: 602.5 },
  { date: new Date('2012-03-22'), value: 599.34 },
  { date: new Date('2012-03-23'), value: 596.05 },
  { date: new Date('2012-03-26'), value: 606.98 },
  { date: new Date('2012-03-27'), value: 614.48 },
  { date: new Date('2012-03-28'), value: 617.62 },
  { date: new Date('2012-03-29'), value: 609.86 },
  { date: new Date('2012-03-30'), value: 599.55 },
  { date: new Date('2012-04-02'), value: 618.63 },
  { date: new Date('2012-04-03'), value: 629.32 },
  { date: new Date('2012-04-04'), value: 624.31 },
  { date: new Date('2012-04-05'), value: 633.68 },
  { date: new Date('2012-04-09'), value: 636.23 },
  { date: new Date('2012-04-10'), value: 628.44 },
  { date: new Date('2012-04-11'), value: 626.2 },
  { date: new Date('2012-04-12'), value: 622.77 },
  { date: new Date('2012-04-13'), value: 605.23 },
  { date: new Date('2012-04-16'), value: 580.13 },
  { date: new Date('2012-04-17'), value: 609.7 },
  { date: new Date('2012-04-18'), value: 608.34 },
  { date: new Date('2012-04-19'), value: 587.44 },
  { date: new Date('2012-04-20'), value: 572.98 },
  { date: new Date('2012-04-23'), value: 571.7 },
  { date: new Date('2012-04-24'), value: 560.28 },
  { date: new Date('2012-04-25'), value: 610.0 },
  { date: new Date('2012-04-26'), value: 607.7 },
  { date: new Date('2012-04-27'), value: 603.0 },
  { date: new Date('2012-04-30'), value: 583.98 },
  { date: new Date('2012-05-01'), value: 582.13 },
];
