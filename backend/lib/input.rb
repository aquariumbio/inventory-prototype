# Process input parameters
module Input
  # Return compressed text (nil if blank)
  def self.text(str)
    str = str.to_s.strip.gsub(/ +/, ' ')
    str = nil if str == ""

    return str
  end

  # Return an int (nil or undefined returns 0)
  def self.int(n)
    n = n.to_s.to_i

    return n
  end

  # Return a float (nil or undefined returns 0)
  def self.float(n)
    n = n.to_s.to_f

    return n
  end

  # Return a boolean ("true" or "on" or "1" returns true)
  def self.boolean(str)
    str = str.to_s.strip
    bool = str == "true" || str == "on" || str == "1"

    return bool
  end
end
