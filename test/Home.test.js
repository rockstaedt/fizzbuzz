import {fireEvent, render, screen} from "@testing-library/react";
import Home, {EMPTY_RESULT_HINT, ERROR_TEXT} from "@pages/";
import userEvent from "@testing-library/user-event";

describe("<Home/>...", () => {

    //-------------------------------------
    //-  feel free to at more test cases  -
    //-------------------------------------

    describe("renders properly the...", () => {

        it("headline", () => {
            render(<Home/>);

            screen.getByRole("heading", {name: "FizzBuzz - Bewerber Quiz", level: 1});
        });

        it("input for target digit", () => {
            render(<Home />);

            screen.getByLabelText("Zielnummer", {selector: "main > label > input"});
        });

        it("submit button", () => {
            render(<Home />);

            screen.getByRole("button", {name: "Generieren"});
        });

        it("hint text that a digit greater 0 has to be submitted", () => {
            render(<Home />);

            screen.getByText(EMPTY_RESULT_HINT, {selector: ".result"});
        });

        describe("result when...", () => {

            it("only digits has to be rendered", async () => {
                render(<Home/>);

                await submitFormWith(2);

                // hint should be disappeared
                expect(screen.queryByText(EMPTY_RESULT_HINT, {selector: ".result"})).toBeNull();

                screen.getByText(/^1$/g, {selector: ".result li"});
                screen.getByText(/^2$/g, {selector: ".result li"});
            });

            it("Fizz has to be rendered", async () => {
                render(<Home />);

                await submitFormWith(6);

                expect(screen.getAllByText("Fizz", {selector: ".result li"})).toHaveLength(2);
            });

            it("Buzz has to be rendered", async () => {
                render(<Home />);

                await submitFormWith(10);

                expect(screen.getAllByText("Buzz", {selector: ".result li"})).toHaveLength(2);
            });

            it("FizzBuzz has to be rendered", async () => {
                render(<Home />);

                await submitFormWith(20);

                expect(screen.getAllByText("FizzBuzz", {selector: ".result li"})).toHaveLength(1);
            });

        });

        it("error message when a digit lower than 1 was submitted", async () => {
            render(<Home />);

            await submitFormWith(0);

            screen.getByText(ERROR_TEXT, {selector: ".error-text"});
        });

    });

    it("clears result list when input gains focus", async () => {
        render(<Home value={3}/>);

        expect(screen.getAllByText("Fizz", {selector: ".result li"})).toHaveLength(1);

        gainFocusOnInput();

        await screen.findByText(EMPTY_RESULT_HINT, {selector: ".result"});
    });

    async function submitFormWith(digit){
        await userEvent.type(screen.getByLabelText("Zielnummer", {}), String(digit));

        fireEvent.click(screen.getByRole("button", {}));
    }

    function gainFocusOnInput() {
        fireEvent.focus(screen.getByLabelText("Zielnummer", {}));
    }
});