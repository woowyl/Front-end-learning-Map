export function cubicBezier(p1x, p1y, p2x, p2y) {
    const ZERO_LIMIT = 1e-6;
    //Calculate the polynomial coeffficients,
    //implicit first and last control points are (0, 0) and (1,1)

    const ax = 3 * p1x - 3 * p2x +1;
    const bx = 3 * p2x - 6 * p1x;
    const cx = 3 * p1x;

    const ay =  
}