def pm25_to_aqi(pm25):
  if (pm25 <= 0):
    return(0)
  else:
    # https://www.ecfr.gov/cgi-bin/retrieveECFR?n=40y6.0.1.1.6#sp40.6.58.g
    # From 40 CFR 58 Appendix G.12.ii:
    pm_range_low = [0.0, 12.1, 35.5, 55.5, 150.5, 250.5, 350.5]
    pm_range_high = [12.0, 35.4, 55.4, 150.4, 250.4, 350.4, 500.4]
    aqi_range_low = [0, 51, 101, 151, 201, 301, 401]
    aqi_range_high = [50, 100, 150, 200, 300, 400, 500]

    idx_key = 0

    for idx, val in enumerate(pm_range_high):
      if pm25 > val:
        idx_key = idx + 1

    idx_key = min(idx_key, len(pm_range_high)-1)

    pm_hi = pm_range_high[idx_key]
    pm_low = pm_range_low[idx_key]
    aqi_hi = aqi_range_high[idx_key]
    aqi_low = aqi_range_low[idx_key]

    aqi_pm25 = (aqi_hi - aqi_low)/(pm_hi - pm_low)*(pm25 - pm_low)+aqi_low
    return(round(aqi_pm25))