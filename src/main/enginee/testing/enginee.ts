export interface TestResultInterface {
  name: string;
  success: boolean;
  message: string;
}

export type TTestResults = Array<TestResultInterface>;

export class ABTestEngine {
  private results: TTestResults = [];

  constructor(private response: unknown) {
    this.response = response;
  }

  addDemoResults = (results: TTestResults) => {
    this.results = [
      {
        name: "Test 1",
        success: true,
        message: "Message 1",
      },
      {
        name: "Test 2",
        success: true,
        message: "Message 2",
      },
      {
        name: "Test 3",
        success: false,
        message: "Message 3",
      },
      {
        name: "Test 4",
        success: true,
        message: "Message 4",
      },
    ];
  };

  getResults = () => {
    return this.results;
  };
}
